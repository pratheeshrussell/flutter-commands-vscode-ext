var vscode = require( 'vscode' );
var tree = require( './treeView.js' );
/**
 * @param {vscode.ExtensionContext} context
 */

async function activate(context) {
	let newTerminalId = 1;
	let isOk2 = await isFlutterProject();
	if( isOk2   === false )
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





	let runBuildInParts = vscode.commands.registerCommand('extension.runBuildInParts', async function () {
		console.log('Attempting to run command...');
		let isOk = await isFlutterProject();
		if(isOk == false){
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
		 console.log('Running command flutter build apk --split-per-abi');
		 terminal.sendText("flutter build apk --split-per-abi");
	});

	let runBuildFat = vscode.commands.registerCommand('extension.runBuildFat', async function () {
		console.log('Attempting to run command...');
		let isOk = await isFlutterProject();
		if(isOk == false){
			console.log('This is not a flutter project');
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
		 console.log('Running command flutter build apk --release');
		 terminal.sendText("flutter build apk --release");
	});

	let runPackageRepair = vscode.commands.registerCommand('extension.runPackageRepair', async function () {
		console.log('Attempting to run command...');
		let isOk = await isFlutterProject();
		if(isOk == false){
			console.log('This is not a flutter project');
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
		 console.log('Running commands');
		 await vscode.workspace.findFiles("**/.packages").then((paths) =>{
			if(paths.length > 0){
			  vscode.workspace.fs.delete(paths[0]);
			}
		});
		 
		 terminal.sendText("flutter pub get");

	});

	let runProjectRepair = vscode.commands.registerCommand('extension.runProjectRepair', async function () {
		console.log('Attempting to run command...');
		let isOk = await isFlutterProject();
		if(isOk == false){
			console.log('This is not a flutter project');
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
		 console.log('Attempting to repair project'); 
		 
		 terminal.sendText("flutter clean");
		 terminal.sendText("flutter create .");

	});

	context.subscriptions.push(todoTreeView);
	context.subscriptions.push(runBuildInParts);
	context.subscriptions.push(runBuildFat);
	context.subscriptions.push(runPackageRepair);
	context.subscriptions.push(runProjectRepair);
	
}
exports.activate = activate;


function deactivate() {}
module.exports = {
	activate,
	deactivate
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
			//console.log("This is a flutter project");
		}
	});
	return status;
}







