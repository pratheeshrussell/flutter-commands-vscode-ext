const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
//flutter build apk --release
function activate(context) {
	let newTerminalId = 1;
	let runBuildInParts = vscode.commands.registerCommand('extension.runBuildInParts', async function () {
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
		 terminal = vscode.window.createTerminal('Flutter Command Terminal' + newTerminalId++, vscode.workspace.rootPath);
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
		 terminal = vscode.window.createTerminal('Flutter Command Terminal' + newTerminalId++, vscode.workspace.rootPath);
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
		 terminal = vscode.window.createTerminal('Flutter Command Terminal' + newTerminalId++, vscode.workspace.rootPath);
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
		 terminal = vscode.window.createTerminal('Flutter Command Terminal' + newTerminalId++, vscode.workspace.rootPath);
		}
		 terminal.show;
		 console.log('Attempting to repair project'); 
		 
		 terminal.sendText("flutter clean");
		 terminal.sendText("flutter create .");

	});


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