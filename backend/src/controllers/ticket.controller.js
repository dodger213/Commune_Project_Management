const ticketModel = require("../models/ticket.model");

exports.getProjectTicket = async (req, res) => {
    try {
        const { id: projectId } = req.params;
        const ticket = await ticketModel.find({
            project: { $eq: projectId }
        })
            .populate('developer')
            ;
        res.status(200).json({
            message: "Get all tickets successfully.",
            tickets: ticket,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
exports.getAllTickets = async (req, res) => {
    try {
        const ticket = await ticketModel.find({
        })
        res.status(200).json({
            message: "Get all tickets successfully.",
            tickets: ticket,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


exports.createATicket = async (req, res) => {
    const { body } = req;
    const newticket = new ticketModel(body);
    await newticket.save((err) => {
        if (err) {
            res.status(500).json({
                message: err.message,
            });
        } else {
            res.status(201).json({
                message: "Create a new ticket successfully.",
            });
        }
    });
};


exports.updateATicket = async (req, res) => {
    try {
        const { id: ticketId } = req.params;
        const ticket = await ticketModel.findByIdAndUpdate(ticketId, req.body, { new: true, runValidators: true });

        if (!ticket) {
            return res.status(404).json({ msg: `No ticket with id: ${ticketId}` });
        } else {
            res.status(200).json({
                msg: `ticket with id: ${ticketId} updated successfully.`,
                ticket: ticket,
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteATicket = async (req, res) => {
    try {
        const { id: ticketId } = req.params;
        const user = await ticketModel.findByIdAndDelete(ticketId);
        return res.status(200).json({ msg: `ticket deleted with id: ${ticketId}`, user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

