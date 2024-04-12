const { parse } = require('csv-parser');
const mongoose = require('mongoose');
const fs = require('path'); // Added for file path access

// Import your models here
const Agent = require('../models/agent');
const User = require('../models/user');
const UserAccount = require('../models/UserAccount'); 
const PolicyCategory = require('../models/PolicyCategory');
const PolicyCarrier = require('../models/PolicyCarrier');
const PolicyInfo = require('../models/policyInfo');


const mongoURI = 'mongodb://localhost:27017/csvupload'; // Replace with your connection string

mongoose.connect(mongoURI, {  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));


  async function processRecord(record) {
    // Create instances of relevant models based on data
    const agent = new Agent({ agentName: record.AgentName });
    const user = new User({
        firstName: record.firstName,
        lastName: record.lastName || "", // Handle missing last name gracefully (optional)
        DOB: new Date(record.DOB), // Convert DOB string to Date object
        address: record.address,
        phoneNumber: record.phoneNumber,
        state: record.state,
        zipCode: record.zipCode,
        email: record.email,
        gender: record.gender,
        userType: record.userType,
    });

    let userAccount;
    if (record.accountName) {
      userAccount = new UserAccount({ accountName: record.accountName });
    }

    // Find or create PolicyCategory and PolicyCarrier instances based on names
    const policyCategory = await PolicyCategory.findOne({ categoryName: record.policyCategory }) ||
      new PolicyCategory({ categoryName: record.policyCategory });
    const policyCarrier = await PolicyCarrier.findOne({ companyName: record.policyCarrier }) ||
      new PolicyCarrier({ companyName: record.policyCarrier });

    // Create PolicyInfo instance
    const policyInfo = new PolicyInfo({
      policyNumber: record.policyNumber,
      policyStartDate: new Date(record.policyStartDate),
      policyEndDate: new Date(record.policyEndDate),
      policyCategory: policyCategory._id,
      collectionId: record.collectionId,
      companyCollectionId: record.companyCollectionId,
      userId: user._id,
    });

    // Save each model instance to MongoDB (handle errors appropriately)
    try {
      await agent.save();
      await user.save();
      if (userAccount) await userAccount.save(); // Save UserAccount if created
      await policyCategory.save(); // Save or update PolicyCategory
      await policyCarrier.save(); // Save or update PolicyCarrier
      await policyInfo.save();
      console.log(`Record processed successfully: ${record.policyNumber}`);
  

    } catch (err) {
        console.error(`Error processing record: ${record.policyNumber}`, err);

    }
  }

  
  module.exports = async (filePath) => {
    // Use csv-parser to read the CSV file
    const csvStream = fs.createReadStream(filePath)
      .pipe(parse());
  
    csvStream.on('data', async (record) => {
      await processRecord(record);
    });
  
    csvStream.on('end', () => {
      console.log('CSV processing completed');
      mongoose.connection.close(); // Close connection after processing
    });
  
    csvStream.on('error', (err) => {
      console.error(err);
      mongoose.connection.close(); // Close connection on error
    });
  };
  