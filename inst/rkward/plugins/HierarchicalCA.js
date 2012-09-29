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
	var drpCmpttnmt = getValue("drp_Cmpttnmt");
	var spnPwrfMnkw = getValue("spn_PwrfMnkw");
	var drpAgglmrtn = getValue("drp_Agglmrtn");
	var spnDrwbrdr1 = getValue("spn_Drwbrdr1");
	var spnFrctnfhg = getValue("spn_Frctnfhg");
	var spnMnmmhght = getValue("spn_Mnmmhght");
	var chcPltsplts = getValue("chc_Pltsplts");
	var frmUsnlysbsChecked = getValue("frm_Usnlysbs.checked");
	var frmDrwdndrgChecked = getValue("frm_Drwdndrg.checked");

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
	var frmDtprprtnEnabled = getValue("frm_Dtprprtn.enabled");
	if(frmDtprprtnEnabled == "true") {
		echo("\t# Compute distance matrix\n\tclust.h.distances <- dist(");
		if(varData) {
			echo("\n\t\tx=" + varData);
		}
		echo(",\n\t\tmethod=\"" + drpCmpttnmt + "\"");
		if(drpCmpttnmt == "minkowski") {
			echo(",\n\t\tp=" + spnPwrfMnkw);
		}
		echo("\n\t)\n");
		echo("\t# Hierarchical CA\n\tclust.h.result <- hclust(d=clust.h.distances");
		echo(",\n\t\tmethod=\"" + drpAgglmrtn + "\"");
		echo("\n\t)\n\n");
	} else {
		echo("\t# Hierarchical CA\n\tclust.h.result <- hclust(");
		if(varData) {
			echo("\n\t\td=" + varData);
		}
		echo(",\n\t\tmethod=\"" + drpAgglmrtn + "\"");
		echo("\n\t)\n\n");
	}
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
	var drpCmpttnmt = getValue("drp_Cmpttnmt");
	var spnPwrfMnkw = getValue("spn_PwrfMnkw");
	var drpAgglmrtn = getValue("drp_Agglmrtn");
	var spnDrwbrdr1 = getValue("spn_Drwbrdr1");
	var spnFrctnfhg = getValue("spn_Frctnfhg");
	var spnMnmmhght = getValue("spn_Mnmmhght");
	var chcPltsplts = getValue("chc_Pltsplts");
	var frmUsnlysbsChecked = getValue("frm_Usnlysbs.checked");
	var frmDrwdndrgChecked = getValue("frm_Drwdndrg.checked");

	// create the plot
	if(full) {
		echo("rk.header(\"Hierarchical CA results\")\n");
	}

	var frmDrwdndrgChecked = getValue("frm_Drwdndrg.checked");
	var frmUsnlysbsChecked = getValue("frm_Usnlysbs.checked");
	var vrslSlctdvrbShortname = getValue("vrsl_Slctdvrb.shortname").split("\n").join("\", \"");
	var frmDtprprtnEnabled = getValue("frm_Dtprprtn.enabled");
	if(frmDrwdndrgChecked) {
		echo("\n");
	// in case there are generic plot options defined:
	var embGnrcpltpCodePreprocess = getValue("emb_Gnrcpltp.code.preprocess");
	var embGnrcpltpCodePrintout = getValue("emb_Gnrcpltp.code.printout");
	var embGnrcpltpCodeCalculate = getValue("emb_Gnrcpltp.code.calculate");

	if(full) {
		echo("rk.graph.on()\n");
	}
	echo("\ttry({\n");

	// insert any option-setting code that should be run before the actual plotting commands:
	printIndentedUnlessEmpty("\t\t", embGnrcpltpCodePreprocess, "\n", "");

	// the actual plot:
	if(!embGnrcpltpCodePrintout.match(/sub\s*=/) && frmDtprprtnEnabled != "true") {
		echo("\t# extract distance computation method from dist object\n\tdistance.computation <- attr(" + varData + ", \"method\")\n\n");
	}
	echo("\t\tplclust(clust.h.result");
	if(!embGnrcpltpCodePrintout.match(/main\s*=/)) {
		echo(",\n\t\t\tmain=\"Cluster dendrogram\"");
	}
	if(!embGnrcpltpCodePrintout.match(/sub\s*=/)) {
		if(frmDtprprtnEnabled == "true") {
			echo(",\n\t\t\tsub=\"Distance computation: " + drpCmpttnmt + ", agglomeration method: " + drpAgglmrtn + "\"");
		} else {
			echo(",\n\t\t\tsub=paste(\"Distance computation: \", distance.computation, \", agglomeration method: " + drpAgglmrtn + "\", sep=\"\")");
		}
	}
	if(!embGnrcpltpCodePrintout.match(/xlab\s*=/)) {
		echo(",\n\t\t\txlab=\"Data: " + varData + "\"");
	}
	if(chcPltsplts) {
		echo(",\n\t\t\tunit=TRUE");
	}
	if(spnFrctnfhg != 0.1) {
		echo(",\n\t\t\thang=" + spnFrctnfhg);
	}
	if(spnMnmmhght != 0) {
		echo(",\n\t\t\thmin=" + spnMnmmhght);
	}
	echo(embGnrcpltpCodePrintout.replace(/, /g, ",\n\t\t\t"));
	echo(")");
	if(spnDrwbrdr1 > 1) {
		echo("\n\t\trect.hclust(clust.h.result, k=" + spnDrwbrdr1 + ", border=\"red\")");
	}

	// insert any option-setting code that should be run after the actual plot:
	printIndentedUnlessEmpty("\t\t", embGnrcpltpCodeCalculate, "\n", "");

	echo("\n\t})\n");
	if(full) {
		echo("rk.graph.off()\n");
	}
	}
	if(full) {
		echo("\nrk.print(clust.h.result)\n");
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
		echo(".GlobalEnv$" + svbSvrsltst + " <- clust.h.result\n");
	}


}