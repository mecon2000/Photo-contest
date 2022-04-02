const isUserAdmin = async (userId) => {
    console.log(`mock checking if user ${userId} is admin`);
    return true;
  };

  module.exports = { isUserAdmin};