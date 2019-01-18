"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function validatersvp(req, res, next) {
    var responses = ["yes", "no", "maybe"];
    var response = req.body.response;

    if (response) response = response.toLowerCase();
    if (!responses.includes(response)) {
        return res.json({
            status: 400,
            error: "Your response must be yes, no or maybe"
        });
    }
    next();
}
exports.default = validatersvp;