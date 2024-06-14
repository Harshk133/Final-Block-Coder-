Blockly.defineBlocksWithJsonArray([
    // Express Server
    {
        "type": "express_server",
        "message0": "Initialize Express server",
        "nextStatement": null,
        "colour": 230,
        "tooltip": "Initializes an Express server.",
        "helpUrl": ""
    },
    // Express Middleware
    {
        "type": "express_middleware",
        "message0": "Use middleware %1",
        "args0": [
            {
                "type": "field_input",
                "name": "MIDDLEWARE",
                "text": "middlewareFunction"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 180,
        "tooltip": "Adds middleware to the Express server.",
        "helpUrl": ""
    },
    // Express Response
    {
        "type": "express_response",
        "message0": "Send response %1",
        "args0": [
            {
                "type": "field_input",
                "name": "RESPONSE",
                "check": "String"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 260,
        "tooltip": "Sends a response to the client.",
        "helpUrl": ""
    },
    // Express Route
    {
        "type": "express_route",
        "message0": "Handle %1 request at %2",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "METHOD",
                "options": [
                    ["GET", "GET"],
                    ["POST", "POST"],
                    ["PUT", "PUT"],
                    ["DELETE", "DELETE"]
                ]
            },
            {
                "type": "field_input",
                "name": "ROUTE",
                "text": "/"
            }
        ],
        "message1": "Do %1",
        "args1": [
            {
                "type": "input_statement",
                "name": "DO"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 160,
        "tooltip": "Defines a route for handling requests.",
        "helpUrl": ""
    },
    // Express Listen
    {
        "type": "express_listen",
        "message0": "Start server on %1",
        "args0": [
            {
                "type": "field_input",
                "name": "PORT",
                "check": "Port",
                "variable": "",
                "variableTypes": ["Number"]

            }
        ],
        "previousStatement": null,
        "colour": 230,
        "tooltip": "Starts the Express server on the specified port.",
        "helpUrl": ""
    }
]);

// Code Generation 
javascript.javascriptGenerator.forBlock['express_server'] = function (block) {
    var code = `const express = require('express');\nconst app = express();
    `;
    return code;
};

javascript.javascriptGenerator.forBlock['express_route'] = function (block) {
    var method = block.getFieldValue('METHOD');
    var route = block.getFieldValue('ROUTE');
    // Save the route to localStorage
    localStorage.setItem('serverRoute', route);
    var statements_do = Blockly.JavaScript.statementToCode(block, 'DO');
    var code = `
app.${method.toLowerCase()}('${route}', (req, res) => {
    ${statements_do}
});
    `;
    return code;
};

// TODO: Add Express Middleware code generation logic!

javascript.javascriptGenerator.forBlock['express_response'] = function (block) {
    var response = block.getFieldValue('RESPONSE');
    var code = `res.send('${response}');`;
    return code;
};

javascript.javascriptGenerator.forBlock['express_listen'] = function (block) {
    var port = block.getFieldValue("PORT");
    localStorage.setItem('serverPort', port);
    var code = `
app.listen(${port}, () => {
    console.log('Server running on port ' + ${port});
});
    `;
    return code;
};