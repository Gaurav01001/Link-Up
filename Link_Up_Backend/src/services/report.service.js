const prisma =
    require("../config/prisma");

const createReport = async (
    reporterId,
    reportedId,
    reason,
    description
) => {

    // prevent self report
    if (
        reporterId === reportedId
    ) {

        throw new Error(
            "You cannot report yourself"
        );

    }

    // check reporter exists
    const reporter =
        await prisma.user.findUnique({

            where: {
                id: reporterId,
            },

        });

    if (!reporter) {

        throw new Error(
            "Reporter not found"
        );

    }

    // check reported user exists
    const reported =
        await prisma.user.findUnique({

            where: {
                id: reportedId,
            },

        });

    if (!reported) {

        throw new Error(
            "Reported user not found"
        );

    }

    // prevent duplicate reports
    const existingReport =
        await prisma.report.findFirst({

            where: {
                reporterId,
                reportedId,
                reason,
            },

        });

    if (existingReport) {

        throw new Error(
            "You already reported this user for this reason"
        );

    }

    // create report
    const report =
        await prisma.report.create({

            data: {
                reporterId,
                reportedId,
                reason,
                description,
            },

        });

    return report;
};

const getReports = async () => {

    const reports =
        await prisma.report.findMany({

            include: {

                reporter: {

                    select: {
                        id: true,
                        name: true,
                        username: true,
                    },

                },

                reported: {

                    select: {
                        id: true,
                        name: true,
                        username: true,
                    },

                },

            },

            orderBy: {
                createdAt: "desc",
            },

        });

    return reports;
};

const getReportById = async (id) => {

    const report = await prisma.report.findUnique({
        where: {
            id,
        },

        include: {

            reporter: {

                select: {
                    id: true,
                    name: true,
                    username: true,
                },

            },

            reported: {

                select: {
                    id: true,
                    name: true,
                    username: true,
                },

            },

        },

    });

    if (!report) {

        throw new Error(
            "Report not found"
        );

    }

    return report;
};

const deleteReport = async (
    id
) => {

    // check report exists
    const report =
        await prisma.report.findUnique({

            where: {
                id,
            },

        });

    if (!report) {

        throw new Error(
            "Report not found"
        );

    }

    // delete report
    const deletedReport =
        await prisma.report.delete({

            where: {
                id,
            },

        });

    return deletedReport;
};

module.exports = {
    createReport,
    getReports,
    getReportById,
    deleteReport,
};