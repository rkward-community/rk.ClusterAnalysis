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
	var spnMxmmnmbr = getValue("spn_Mxmmnmbr");
	var radMethod = getValue("rad_Method");
	var drpCmpttnmt = getValue("drp_Cmpttnmt");
	var spnPwrfMnkw = getValue("spn_PwrfMnkw");
	var drpAgglmrtn = getValue("drp_Agglmrtn");
	var frmUsnlysbsChecked = getValue("frm_Usnlysbs.checked");

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
	if(radMethod == "kmeans" && varData) {
		echo("\t# Calculate within groups sum of squares" + "\n\tclust.wss <- (nrow(" + varData + ")-1) * sum(apply(" + varData + ", 2, var))\n" + "\tfor (i in 2:" + spnMxmmnmbr + "){\n\t\tclust.wss[i] <- kmeans(" + varData + ", centers=i)$tot.withinss\n\t}\n\n");
	}
	if(radMethod == "hclust" && varData) {
		echo("\t# Get clustering criterion");
		if(frmDtprprtnEnabled == "true") {
			echo("\n\tclust.from <- nrow(" + varData + ")-" + spnMxmmnmbr + "\n\tclust.to <- nrow(" + varData + ")-1" + "\n\tclust.wss <- hclust(dist(" + varData + ", method=\"" + drpCmpttnmt + "\"), method=\"" + drpAgglmrtn + "\")$height[clust.from:clust.to]\n\n");
		} else {
			echo("\n\tclust.from <- attr(" + varData + ", \"Size\")-" + spnMxmmnmbr + "\n\tclust.to <- attr(" + varData + ", \"Size\")-1" + "\n\tclust.wss <- hclust(" + varData + ", method=\"" + drpAgglmrtn + "\")$height[clust.from:clust.to]\n\n");
		}
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
	var spnMxmmnmbr = getValue("spn_Mxmmnmbr");
	var radMethod = getValue("rad_Method");
	var drpCmpttnmt = getValue("drp_Cmpttnmt");
	var spnPwrfMnkw = getValue("spn_PwrfMnkw");
	var drpAgglmrtn = getValue("drp_Agglmrtn");
	var frmUsnlysbsChecked = getValue("frm_Usnlysbs.checked");

	// create the plot
	if(full) {
		echo("rk.header(\"Determine number of clusters results\")\n");
	}

	var frmUsnlysbsChecked = getValue("frm_Usnlysbs.checked");
	var vrslSlctdvrbShortname = getValue("vrsl_Slctdvrb.shortname").split("\n").join("\", \"");
	var frmDtprprtnEnabled = getValue("frm_Dtprprtn.enabled");
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
	if(!embRkwrdpltptnGCodePrintout.match(/sub\s*=/) && frmDtprprtnEnabled != "true") {
		echo("\t# extract distance computation method from dist object\n\tdistance.computation <- attr(" + varData + ", \"method\")\n\n");
	}
	echo("\t\tplot(\n\t\t\t");
	if(radMethod == "kmeans" && frmDtprprtnEnabled == "true") {
		echo("1:" + spnMxmmnmbr + ",\n\t\t\tclust.wss");
		if(!embRkwrdpltptnGCodePrintout.match(/type\s*=/)) {
			echo(",\n\t\t\ttype=\"b\"");
		}
		if(!embRkwrdpltptnGCodePrintout.match(/xlab\s*=/)) {
			echo(",\n\t\t\txlab=\"Number of Clusters\"");
		}
		if(!embRkwrdpltptnGCodePrintout.match(/ylab\s*=/)) {
			echo(",\n\t\t\tylab=\"Within groups sum of squares\"");
		}
		if(!embRkwrdpltptnGCodePrintout.match(/main\s*=/)) {
			echo(",\n\t\t\tmain=\"Within sum of squares by clusters\"");
		}
		if(!embRkwrdpltptnGCodePrintout.match(/sub\s*=/)) {
			echo(",\n\t\t\tsub=\"Examined " + spnMxmmnmbr + " clusters using k-means partitioning\"");
		}
		echo(embRkwrdpltptnGCodePrintout.replace(/, /g, ",\n\t\t\t"));
		echo(")");
	}
	if(radMethod == "hclust" || frmDtprprtnEnabled != "true") {
		echo("clust.wss");
		if(!embRkwrdpltptnGCodePrintout.match(/type\s*=/)) {
			echo(",\n\t\t\ttype=\"b\"");
		}
		if(!embRkwrdpltptnGCodePrintout.match(/xlab\s*=/)) {
			echo(",\n\t\t\txlab=\"Number of Clusters\"");
		}
		if(!embRkwrdpltptnGCodePrintout.match(/ylab\s*=/)) {
			echo(",\n\t\t\tylab=\"Agglomeration criterion\"");
		}
		if(!embRkwrdpltptnGCodePrintout.match(/main\s*=/)) {
			echo(",\n\t\t\tmain=\"Inverse Scree plot\"");
		}
		if(!embRkwrdpltptnGCodePrintout.match(/sub\s*=/)) {
			if(frmDtprprtnEnabled == "true") {
				echo(",\n\t\t\tsub=\"Examined " + spnMxmmnmbr + " clusters (dist: " + drpCmpttnmt + ", hclust: " + drpAgglmrtn + ")\"");
			} else {
				echo(",\n\t\t\tsub=paste(\"Examined " + spnMxmmnmbr + " clusters (dist: \", distance.computation, \", hclust: " + drpAgglmrtn + ")\", sep=\"\")");
			}
		}
		echo(",\n\t\t\txaxt=\"n\"");
		echo(embRkwrdpltptnGCodePrintout.replace(/, /g, ",\n\t\t\t"));
		echo(")" + "\n\t\taxis(1, at=1:" + spnMxmmnmbr + ", labels=" + spnMxmmnmbr + ":1)");
	}

	// insert any option-setting code that should be run after the actual plot:
	printIndentedUnlessEmpty("\t\t", embRkwrdpltptnGCodeCalculate, "\n", "");

	echo("\n\t})\n");
	if(full) {
		echo("rk.graph.off()\n");
	}
	if(!full) {
		if(frmUsnlysbsChecked & vrslSlctdvrbShortname != "") {
			echo("\nrk.header(\"Subset of variables included the analysis\", level=3)\nrk.print(list(\"" + vrslSlctdvrbShortname + "\"))\n\n");
		}
	}
}