module.exports = (sequelize, DataTypes) => {
    const Sellers = this.sequelize.define('Sellers', {
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
          location: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          image: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          category: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          items: {
            type: DataTypes.STRING,
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
    tableName: 'products'           
    });
    return Products;
}