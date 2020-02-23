var vscode = require( 'vscode' );
//Tree display classes
class TreeTask extends vscode.TreeItem {	
	constructor(type,label,collapsibleState,command)
    {
		super(label, collapsibleState);
		this.type = type;
        this.command = command;
    }

}
exports.TreeTask = TreeTask;

class TreeNodeProvider
{	
    constructor(_context )
    {
        this._context = _context;

        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
    }

    getChildren()
    {
		let cmds = [];
		cmds[0] = new TreeTask("mycmd", "Flutter Commands: Build Split APK", 
		vscode.TreeItemCollapsibleState.None, { command: 'fluttercmd.executecmd', title: "Execute" ,arguments: ["1"] });		
		cmds[1] = new TreeTask("mycmd", "Flutter Commands: Build Fat APK", 
		vscode.TreeItemCollapsibleState.None, { command: 'fluttercmd.executecmd', title: "Execute" ,arguments: ["2"] });		
		cmds[2] = new TreeTask("mycmd", "Flutter Commands: Repair Imports", 
		vscode.TreeItemCollapsibleState.None, { command: 'fluttercmd.executecmd', title: "Execute" ,arguments: ["3"] });		
		cmds[3] = new TreeTask("mycmd", "Flutter Commands: Repair Project", 
		vscode.TreeItemCollapsibleState.None, { command: 'fluttercmd.executecmd', title: "Execute" ,arguments: ["4"] });		
		
		
		
		return cmds;
	}
	getTreeItem(cmds) {
		return cmds;
	}

   
}
exports.TreeNodeProvider = TreeNodeProvider;
//Tree display classes