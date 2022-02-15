var vscode = require('vscode');
//Tree display classes
class TreeCmd extends vscode.TreeItem {
	constructor(type, label, collapsibleState, command) {
		super(label, collapsibleState);
		this.type = type;
		this.command = command;
	}
}
exports.TreeCmd = TreeCmd;

class TreeNodeProvider {
	constructor(_context) {
		this._context = _context;

		this._onDidChangeTreeData = new vscode.EventEmitter();
		this.onDidChangeTreeData = this._onDidChangeTreeData.event;
	}
	getChildren() {
		let cmds = [];
		cmds[0] = new TreeCmd('mycmd', 'Flutter Commands: Build Split APK', vscode.TreeItemCollapsibleState.None, {
			command: 'fluttercmd.executecmd',
			title: 'Execute',
			arguments: [ '1' ]
		});
		cmds[1] = new TreeCmd('mycmd', 'Flutter Commands: Build Fat APK', vscode.TreeItemCollapsibleState.None, {
			command: 'fluttercmd.executecmd',
			title: 'Execute',
			arguments: [ '2' ]
		});
		cmds[2] = new TreeCmd('mycmd', 'Flutter Commands: Build APK App Bundle', vscode.TreeItemCollapsibleState.None, {
			command: 'fluttercmd.executecmd',
			title: 'Execute',
			arguments: [ '5' ]
		});
		cmds[3] = new TreeCmd('mycmd', 'Flutter Commands: Repair Imports', vscode.TreeItemCollapsibleState.None, {
			command: 'fluttercmd.executecmd',
			title: 'Execute',
			arguments: [ '3' ]
		});
		cmds[4] = new TreeCmd('mycmd', 'Flutter Commands: Repair Project', vscode.TreeItemCollapsibleState.None, {
			command: 'fluttercmd.executecmd',
			title: 'Execute',
			arguments: [ '4' ]
		});
		cmds[5] = new TreeCmd(
			'mycmd',
			'Flutter Commands: Clean Pod and Rebuild',
			vscode.TreeItemCollapsibleState.None,
			{ command: 'fluttercmd.executecmd', title: 'Execute', arguments: [ '6' ] }
		);

		return cmds;
	}
	getTreeItem(cmds) {
		return cmds;
	}
}
exports.TreeNodeProvider = TreeNodeProvider;
//Tree display classes
