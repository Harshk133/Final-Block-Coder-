console.log("Hello world Programmer!\nJay Shree Ram🙏");
(function () {
    var socket = io("http://localhost:9000");
    console.log(socket);

    //* 1) we need to create `toolbox`
    const toolbox = {
        kind: "categoryToolbox",
        contents: [
            {
                "kind": "category",
                "name": "Basic",
                "contents": [
                    {
                        kind: 'block',
                        type: 'express_server',
                    },
                    {
                        kind: "block",
                        type: "express_middleware"
                    },
                    {
                        kind: "block",
                        type: "express_response"
                    },
                    {
                        kind: "block",
                        type: "express_route"
                    },
                    {
                        kind: "block",
                        type: "express_listen"
                    }
                ]
            }
        ]
    }

    //* 2) we need to create `workspace`
    var workspace = Blockly.inject('blocklyDiv', {
        renderer: 'Zelos',
        toolbox: toolbox,
        scrollbars: false,
        horizontalLayout: false,
        toolboxPosition: "start",
    });

    //* 3) we need to display the `Generated Code`
    function generateAndDisplayCode() {
        var code = Blockly.JavaScript.workspaceToCode(workspace);
        code = code.replace(/connection\.connect\((.*)\)/, 'const connection = new $1;');
        console.log("Generated Code:\n");
        console.log(code);
        socket.emit('file:change', { content: code });
        // var serverPort = localStorage.getItem('serverPort');
        // if (serverPort) {
        //     var url = 'http://localhost:' + serverPort;
        //     window.open(url, '_blank');
        // } else {
        //     console.error('Server port not found in localStorage.');
        // }
        // Construct the URL dynamically
        var serverPort = localStorage.getItem('serverPort');
        var serverRoute = localStorage.getItem('serverRoute');
        var url = 'http://localhost:' + (serverPort || 7000) + (serverRoute || '');
        if(url){
            window.open(url, '_blank');
        }

        // If no route is provided, default to '/'
        if (!serverRoute) {
            url += '/';
        }
    }

    document.getElementById('run-button').addEventListener('click', generateAndDisplayCode);

})();
