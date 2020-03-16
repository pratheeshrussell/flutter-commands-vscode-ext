const vscode = require('vscode');
var tree = require( './treeView.js' );

/**
 * @param {vscode.ExtensionContext} context
 */

//In case we need to create a terminal
let newTerminalId = 1;

//This function runs when the extension gets activated
async function activate(context) {
	//tree view
	let isthisFlutter = await isFlutterProject();
	if( isthisFlutter   === false )
        {
            vscode.commands.executeCommand( 'setContext', 'flutter-commands-is-active', false );
        }
        else
        {
			vscode.commands.executeCommand( 'setContext', 'flutter-commands-is-active', true );			
        }
	
	var provider = new tree.TreeNodeProvider(context);
	var todoTreeView = vscode.window.createTreeView( "flutter-Commands", { treeDataProvider: provider } );
	vscode.commands.registerCommand('fluttercmd.executecmd', function(cmdno) {
		if(cmdno == "1"){
			vscode.commands.executeCommand("extension.runBuildInParts");
		} else if(cmdno == "2"){
			vscode.commands.executeCommand("extension.runBuildFat");
		} else if(cmdno == "3"){
			vscode.commands.executeCommand("extension.runPackageRepair");
		} else if(cmdno == "4"){
			vscode.commands.executeCommand("extension.runProjectRepair");
		}
		
	});

	//commands
	let runBuildInParts = vscode.commands.registerCommand('extension.runBuildInParts', async function () {
		 runCommand("flutter build apk --split-per-abi");
	});

	let runBuildFat = vscode.commands.registerCommand('extension.runBuildFat', async function () {
		runCommand("flutter build apk --release");
	});

	let runPackageRepair = vscode.commands.registerCommand('extension.runPackageRepair', async function () {
		 await vscode.workspace.findFiles("**/.packages").then((paths) =>{
			if(paths.length > 0){
			  vscode.workspace.fs.delete(paths[0]);
			}
		});
		runCommand("flutter pub get");
	});

	let runProjectRepair = vscode.commands.registerCommand('extension.runProjectRepair', async function () {
		 await runCommand("flutter clean");
		 runCommand("flutter create .");

	});

	context.subscriptions.push(todoTreeView);
	context.subscriptions.push(runBuildInParts);
	context.subscriptions.push(runBuildFat);
	context.subscriptions.push(runPackageRepair);
	context.subscriptions.push(runProjectRepair);
}
exports.activate = activate;


// this method is called when your extension is deactivated
function deactivate() {}
module.exports = {
	activate,
	deactivate
}

async function runCommand(cmd){
	vscode.window.showInformationMessage('Attempting to run command');
	let isFlutter = await isFlutterProject();
	if(isFlutter == false){
		vscode.window.showInformationMessage('This doesn\'t seem to be a flutter project');
		return;
	}
	
	let terminal;
	if (ensureTerminalExists()) {
		terminal =(vscode.window).activeTerminal;
	} else {
	 terminal = vscode.window.createTerminal('Flutter Command Terminal' + newTerminalId++);
	}
	 terminal.show;
	 terminal.sendText(cmd);

}

function ensureTerminalExists() {
	if ((vscode.window).terminals.length === 0) {
		return false;
	}
	return true;
}

async function isFlutterProject() {
	let status = false;
	await vscode.workspace.findFiles("**/pubspec.yaml").then((paths) =>{
		if(paths.length > 0){
			status = true;
		}
	});
	return status;
}