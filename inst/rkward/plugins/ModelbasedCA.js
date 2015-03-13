// this code was generated using the rkwarddev package.
//perhaps don't make changes here, but in the rkwarddev script instead!



function preprocess(){
	// add requirements etc. here
	echo("require(mclust)\n");
}

function calculate(){
	// read in variables from dialog

	var varData = getString("var_data");
	var vrslSlctdvrb = getString("vrsl_Slctdvrb");
	var svbSvrsltst = getString("svb_Svrsltst");
	var spnMxnmbrfc = getString("spn_Mxnmbrfc");
	var radPlottype = getString("rad_Plottype");
	var chcRmvmssng = getBoolean("chc_Rmvmssng.state");
	var chcStdrdzvl = getBoolean("chc_Stdrdzvl.state");
	var frmUsnlysbsChecked = getBoolean("frm_Usnlysbs.checked");
	var frmPltrsltsChecked = getBoolean("frm_Pltrslts.checked");

	// the R code to be evaluated
	var frmUsnlysbsChecked = getValue("frm_Usnlysbs.checked");
	var vrslSlctdvrbShortname = getValue("vrsl_Slctdvrb.shortname").split("\n").join("\", \"");
	var frmDtprprtnEnabled = getValue("frm_Dtprprtn.enabled");
	if(frmUsnlysbsChecked && vrslSlctdvrbShortname != "") {
		echo("\t# Use subset of variables\n\t" + varData + " <- subset(" + varData + ", select=c(\"" + vrslSlctdvrbShortname + "\"))\n");
	}
	if(frmDtprprtnEnabled == "true" && chcRmvmssng == "true") {
		echo("\t# Listwise removal of missings\n\t" + varData + " <- na.omit(" + varData + ")\n");
	}
	if(frmDtprprtnEnabled == "true" && chcStdrdzvl == "true") {
		echo("\t# Standardizing values\n\t" + varData + " <- scale(" + varData + ")\n");
	}
	echo("\t# Model based CA\n\tclust.m.result <- Mclust(data=" + varData);
	if(spnMxnmbrfc != 9) {
		echo(",\n\t\tG=1:" + spnMxnmbrfc + "\n\t");
	}
	echo(")\n\n");
}

function printout(){
	// all the real work is moved to a custom defined function doPrintout() below
	// true in this case means: We want all the headers that should be printed in the output:
	doPrintout(true);
}

function preview(){
	preprocess();
	calculate();
	doPrintout(false);
}

function doPrintout(full){
	// read in variables from dialog

	var varData = getString("var_data");
	var vrslSlctdvrb = getString("vrsl_Slctdvrb");
	var svbSvrsltst = getString("svb_Svrsltst");
	var spnMxnmbrfc = getString("spn_Mxnmbrfc");
	var radPlottype = getString("rad_Plottype");
	var chcRmvmssng = getBoolean("chc_Rmvmssng.state");
	var chcStdrdzvl = getBoolean("chc_Stdrdzvl.state");
	var frmUsnlysbsChecked = getBoolean("frm_Usnlysbs.checked");
	var frmPltrsltsChecked = getBoolean("frm_Pltrslts.checked");

	// create the plot
	if(full) {
		new Header(i18n("Model based CA results")).print();

	}

	var frmPltrsltsChecked = getValue("frm_Pltrslts.checked");
	var frmUsnlysbsChecked = getValue("frm_Usnlysbs.checked");
	var vrslSlctdvrbShortname = getValue("vrsl_Slctdvrb.shortname").split("\n").join("\", \"");
	if(frmPltrsltsChecked) {
		echo("\n");
	

	if(full) {
		echo("rk.graph.on()\n");
	}
	echo("\ttry({\n");

	

	// the actual plot:
	echo("\t\tplot(clust.m.result,\n\t\t\tdata=" + varData + ",\n\t\t\twhat=\"" + radPlottype + "\"");
	echo(")");

	

	echo("\n\t})\n");
	if(full) {
		echo("rk.graph.off()\n");
	}
	}
	if(full) {
		echo("\nrk.print(clust.m.result)\n");
	if(frmUsnlysbsChecked & vrslSlctdvrbShortname != "") {
		echo("\nrk.header(\"Subset of variables included the analysis\", level=3)\nrk.print(list(\"" + vrslSlctdvrbShortname + "\"))\n\n");
	}
	}

	// left over from the printout function

	//// save result object
	// read in saveobject variables
	var svbSvrsltst = getValue("svb_Svrsltst");
	var svbSvrsltstActive = getValue("svb_Svrsltst.active");
	var svbSvrsltstParent = getValue("svb_Svrsltst.parent");
	// assign object to chosen environment
	if(svbSvrsltstActive) {
		echo(".GlobalEnv$" + svbSvrsltst + " <- clust.m.result\n");
	}


}