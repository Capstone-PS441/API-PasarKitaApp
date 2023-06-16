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
      Deskripsi_barang: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
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