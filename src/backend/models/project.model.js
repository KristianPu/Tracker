module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define(
        "Project",
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            timeSpent: {
                type: DataTypes.INTEGER,
            },
            startDate: {
                type: DataTypes.DATE,
            },
            endDate: {
                type: DataTypes.DATE,
            },
        },
        {
            timestamps: false,
        }
    )
    return Project;
}