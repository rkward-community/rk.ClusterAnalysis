// this code was generated using the rkwarddev package.
//perhaps don't make changes here, but in the rkwarddev script instead!



function preprocess(){
	// add requirements etc. here

}

function calculate(){
	// read in variables from dialog
	var varData = getValue("var_data");
	var vrslSlctdvrb = getValue("vrsl_Slctdvrb");
	var chcRmvmssng = getValue("chc_Rmvmssng");
	var chcStdrdzvl = getValue("chc_Stdrdzvl");
	var svbSvrsltst = getValue("svb_Svrsltst");
	var spnNmbrfcls = getValue("spn_Nmbrfcls");
	var drpAlgorthm = getValue("drp_Algorthm");
	var spnMxmmnmbr = getValue("spn_Mxmmnmbr");
	var spnIntlrndm = getValue("spn_Intlrndm");
	var chcPltclstr = getValue("chc_Pltclstr");
	var frmUsnlysbsChecked = getValue("frm_Usnlysbs.checked");
	var frmPltrsltsChecked = getValue("frm_Pltrslts.checked");

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
	echo("\tclust.k.result <- kmeans(");
	if(varData) {
		echo("\n\t\tx=" + varData);
	}
	echo(",\n\t\tcenters=" + spnNmbrfcls);
	if(drpAlgorthm != "Hartigan-Wong") {
		echo(",\n\t\talgorithm=\"" + drpAlgorthm + "\"");
	}
	if(spnMxmmnmbr != 10) {
		echo(",\n\t\titer.max=" + spnMxmmnmbr);
	}
	if(spnIntlrndm != 1) {
		echo(",\n\t\tnstart=" + spnIntlrndm);
	}
	echo("\n\t)\n\n");
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
	var varData = getValue("var_data");
	var vrslSlctdvrb = getValue("vrsl_Slctdvrb");
	var chcRmvmssng = getValue("chc_Rmvmssng");
	var chcStdrdzvl = getValue("chc_Stdrdzvl");
	var svbSvrsltst = getValue("svb_Svrsltst");
	var spnNmbrfcls = getValue("spn_Nmbrfcls");
	var drpAlgorthm = getValue("drp_Algorthm");
	var spnMxmmnmbr = getValue("spn_Mxmmnmbr");
	var spnIntlrndm = getValue("spn_Intlrndm");
	var chcPltclstr = getValue("chc_Pltclstr");
	var frmUsnlysbsChecked = getValue("frm_Usnlysbs.checked");
	var frmPltrsltsChecked = getValue("frm_Pltrslts.checked");

	// create the plot
	if(full) {
		echo("rk.header(\"Cluster analysis\")\n");
	}

	var frmPltrsltsChecked = getValue("frm_Pltrslts.checked");
	var frmUsnlysbsChecked = getValue("frm_Usnlysbs.checked");
	var vrslSlctdvrbShortname = getValue("vrsl_Slctdvrb.shortname").split("\n").join("\", \"");
	if(frmPltrsltsChecked) {
		echo("\n");
	// in case there are generic plot options defined:
	var embRkwrdpltptnGCodePreprocess = getValue("emb_rkwrdpltptnG.code.preprocess");
	var embRkwrdpltptnGCodePrintout = getValue("emb_rkwrdpltptnG.code.printout");
	var embRkwrdpltptnGCodeCalculate = getValue("emb_rkwrdpltptnG.code.calculate");

	if(full) {
		echo("rk.graph.on()\n");
	}
	echo("\ttry({\n");

	// insert any option-setting code that should be run before the actual plotting commands:
	printIndentedUnlessEmpty("\t\t", embRkwrdpltptnGCodePreprocess, "\n", "");

	// the actual plot:
	echo("\t\tplot(" + varData + ",\n\t\t\tcol=clust.k.result$cluster");
	if(!embRkwrdpltptnGCodePrintout.match(/main\s*=/)) {
		echo(",\n\t\t\tmain=\"K-means partitioning\"");
	}
	if(!embRkwrdpltptnGCodePrintout.match(/sub\s*=/)) {
		echo(",\n\t\t\tsub=\"Grouped into " + spnNmbrfcls + " clusters by the " + drpAlgorthm + " algorithm\"");
	}
	echo(embRkwrdpltptnGCodePrintout.replace(/, /g, ",\n\t\t\t"));
	echo(")");
	if(chcPltclstr) {
		echo("\n\t\tpoints(clust.k.result$centers, col=1:" + spnNmbrfcls + ", pch=8, cex=2)");
	}

	// insert any option-setting code that should be run after the actual plot:
	printIndentedUnlessEmpty("\t\t", embRkwrdpltptnGCodeCalculate, "\n", "");

	echo("\n\t})\n");
	if(full) {
		echo("rk.graph.off()\n");
	}
	}
	if(full) {
		echo("\nrk.print(clust.k.result)\n");
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
		echo(".GlobalEnv$" + svbSvrsltst + " <- clust.k.result\n");
	}


}