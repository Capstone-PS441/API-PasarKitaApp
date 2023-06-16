module.exports = (sequelize, DataTypes) => {
    const Products = sequelize.define('Products', {
        id: {
            type: DataTypes.INTEGER ,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          category: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          image: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          price: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          location: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          satuan: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          toko: {
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
    tableName: 'products'           
    });
    Products.associate = (models) => {
      Products.belongsTo(models.Sellers, { as: 'Seller' }); // Define the association with the alias 'seller'
    };
    return Products;
}