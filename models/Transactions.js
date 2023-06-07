module.exports = (sequelize, DataTypes) => {
    const Transactions = sequelize.define('Transactions', {
      Id_member: {
        type: DataTypes.INTEGER ,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      Tanggal: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      Item_description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      month: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      day: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      day_of_week: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
          createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
          },
          updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
          },
    },
    {
    tableName: 'transactions'           
    });
    return Transactions;
}