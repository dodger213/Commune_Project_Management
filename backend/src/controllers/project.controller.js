const { use } = require("passport");
const projectModel = require("../models/project.model");
const ticketModel = require("../models/ticket.model");
const userModel = require("../models/user.model");

exports.getAllProject = async (req, res) => {
    try {
        const project = await projectModel.find()
            .populate('developers')
            .populate('pms')
            ;
        res.status(200).json({
            message: "Get all projects successfully.",
            projects: project,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
exports.getNewIdeas = async (req, res) => {
    try {
        const project = await projectModel.find({
            status: 'Idea'
        })
            .populate('developers')
            .populate('pms')
            ;
        res.status(200).json({
            message: "Get all projects successfully.",
            projects: project,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
exports.getBountyRequetsProjects = async (req, res) => {
    try {
        const tickets = await ticketModel.find({ status: "Bounty Request" });
        const projectIds = tickets.map(ticket => ticket.project);

        const project = await projectModel.find({ _id: { $in: projectIds } })
            .populate('developers')
            .populate('pms')
            ;
        res.status(200).json({
            message: "Get all projects successfully.",
            projects: project,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
exports.getReviewRequestProjects = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userModel.find({ _id: id });
        const isAdmin = user[0].role.some((a) => a === 'Administrator');
        const tickets = await ticketModel.find({ reviewRequire: true });
        const projectIds = tickets.map(ticket => ticket.project);
        if (isAdmin) {
            const project = await projectModel.find({
                _id: { $in: projectIds },
            })
                .populate('developers')
                .populate('pms')
                ;
            return res.status(200).json({
                message: "Get all projects successfully.",
                projects: project,
            });
        } else {
            const project = await projectModel.find({
                _id: { $in: projectIds },
                pms: { $elemMatch: { $eq: id } }
            })
                .populate('developers')
                .populate('pms')
                ;
            res.status(200).json({
                message: "Get all projects successfully.",
                projects: project,
            });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getAProject = async (req, res) => {
    const { id } = req.params;
    try {
        const project = await projectModel.find({ _id: id })
            .populate('developers')
            .populate('pms')
            ;
        res.status(200).json({
            message: "Get all projects successfully.",
            project: project,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getUserProject = async (req, res) => {
    try {
        const { id: userId } = req.params;
        const user = await userModel.findById(userId);
        if (user?.role.some((aRole) => aRole === 'Administrator')) {
            const allProjects = await projectModel.find({})
                .populate('developers')
                .populate('pms');
            res.status(200).json({
                message: "Get all admin projects successfully.",
                projects: allProjects
            });
            return;
        }
        const developing = await projectModel.find({
            developers: {
                $in: [userId]
            },
            status: {
                $eq: 'In progress'
            }
        })
            .populate('developers')
            .populate('pms');;
        const managing = await projectModel.find({
            pms: {
                $in: [userId]
            },
            status: {
                $eq: 'In progress'
            }
        })
            .populate('developers')
            .populate('pms');;
        const setA = new Set(developing);

        managing.forEach(item => setA.add(item));

        const result = Array.from(setA);
        res.status(200).json({
            message: "Get all user projects successfully.",
            projects: result
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.createAProject = async (req, res) => {
    const { body } = req;
    const newProject = new projectModel(body);
    await newProject.save((err) => {
        if (err) {
            res.status(500).json({
                message: err.message,
            });
        } else {
            res.status(201).json({
                message: "Create a new project successfully.",
            });
        }
    });
};


exports.updateAProject = async (req, res) => {
    try {
        const { id: projectId } = req.params;
        const previous = await projectModel.findById(projectId);
        if (req.body.developers) {
            const removingDevs = previous.developers.filter((a) => !req.body.developers.some((b) => b == a));
            console.log('removing', removingDevs);
            removingDevs.map(async (a) => {
                const result = await ticketModel.deleteMany({
                    project: projectId,
                    developer: a
                })
            })
        }
        const project = await projectModel.findByIdAndUpdate(projectId, req.body, { new: true, runValidators: true });
        if (!project) {
            return res.status(404).json({ msg: `No project with id: ${projectId}` });
        } else {
            res.status(200).json({
                msg: `project with id: ${projectId} updated successfully.`,
                project: project,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

exports.deleteAProject = async (req, res) => {
    try {
        const { id: projectId } = req.params;
        const project = await projectModel.findByIdAndDelete(projectId);
        return res.status(200).json({ msg: `project deleted with id: ${projectId}`, project });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
