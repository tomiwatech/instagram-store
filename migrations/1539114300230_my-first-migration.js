exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable("usera", {
        id: "id",
        name: { type: "varchar(1000)", notNull: true },
        createdAt: {
            type: "timestamp",
            notNull: true,
            default: pgm.func("current_timestamp")
        }
    });
    pgm.createTable("posts", {
        id: "id",
        userId: {
            type: "integer",
            notNull: true,
            references: '"usera"',
            onDelete: "cascade"
        },
        body: { type: "text", notNull: true },
        createdAt: {
            type: "timestamp",
            notNull: true,
            default: pgm.func("current_timestamp")
        }
    });
    pgm.createIndex("posts", "userId");
};

exports.down = (pgm) => {

};
