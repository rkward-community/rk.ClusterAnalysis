// this code was generated using the rkwarddev package.
// perhaps don't make changes here, but in the rkwarddev script instead!
// 
// look for a file called: $SRC/inst/rkward/rkwarddev_CA_plugin_script.R



function preprocess(){
  // add requirements etc. here

}

function calculate(){
  // read in variables from dialog
  var dataSelected = getString("dataSelected");
  var varsSelected = getString("varsSelected");
  var hSaveResults = getString("hSaveResults");
  var distMethod = getString("distMethod");
  var powerMinkowski = getString("powerMinkowski");
  var clustMethod = getString("clustMethod");
  var clusterBorder = getString("clusterBorder");
  var hHang = getString("hHang");
  var hMinHeight = getString("hMinHeight");
  var omitNA = getBoolean("omitNA.state");
  var scaleValues = getBoolean("scaleValues.state");
  var hUnit = getBoolean("hUnit.state");
  var useSubsetChecked = getBoolean("useSubset.checked");
  var hDendrogramChecked = getBoolean("hDendrogram.checked");

  // the R code to be evaluated
  var useSubsetChecked = getValue("useSubset.checked");
  var varsSelectedShortname = getValue("varsSelected.shortname").split("\n").join("\", \"");
  var frmDtprprtnEnabled = getValue("frm_Dtprprtn.enabled");
  if(useSubsetChecked && varsSelectedShortname != "") {
    comment("Use subset of variables", "  ");  
    echo("\t" + dataSelected + " <- subset(" + dataSelected + ", select=c(\"" + varsSelectedShortname + "\"))\n");  
  } else {}
  if(frmDtprprtnEnabled && omitNA) {
    comment("Listwise removal of missings", "  ");  
    echo("\t" + dataSelected + " <- na.omit(" + dataSelected + ")\n");  
  } else {}
  if(frmDtprprtnEnabled && scaleValues) {
    comment("Standardizing values", "  ");  
    echo("\t" + dataSelected + " <- scale(" + dataSelected + ")\n");  
  } else {}
  var frmDtprprtnEnabled = getValue("frm_Dtprprtn.enabled");
  if(frmDtprprtnEnabled) {
    comment("Compute distance matrix", "  ");  
    echo("\tclust.h.distances <- dist(");  
    if(dataSelected) {
      echo("\n\t\tx=" + dataSelected);  
    } else {}  
    echo(",\n\t\tmethod=\"" + distMethod + "\"");  
    if(distMethod == "minkowski") {
      echo(",\n\t\tp=" + powerMinkowski);  
    } else {}  
    echo("\n\t)\n");  
    comment("Hierarchical CA", "  ");  
    echo("\tclust.h.result <- hclust(\n\t\td=clust.h.distances");  
    echo(",\n\t\tmethod=\"" + clustMethod + "\"");  
    echo("\n\t)\n\n");  
  } else {
    comment("Hierarchical CA", "  ");  
    echo("\tclust.h.result <- hclust(");  
    if(dataSelected) {
      echo("\n\t\td=" + dataSelected);  
    } else {}  
    echo(",\n\t\tmethod=\"" + clustMethod + "\"");  
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
  var dataSelected = getString("dataSelected");
  var varsSelected = getString("varsSelected");
  var hSaveResults = getString("hSaveResults");
  var distMethod = getString("distMethod");
  var powerMinkowski = getString("powerMinkowski");
  var clustMethod = getString("clustMethod");
  var clusterBorder = getString("clusterBorder");
  var hHang = getString("hHang");
  var hMinHeight = getString("hMinHeight");
  var omitNA = getBoolean("omitNA.state");
  var scaleValues = getBoolean("scaleValues.state");
  var hUnit = getBoolean("hUnit.state");
  var useSubsetChecked = getBoolean("useSubset.checked");
  var hDendrogramChecked = getBoolean("hDendrogram.checked");

  // create the plot
  if(full) {
    new Header(i18n("Hierarchical CA results")).print();
  } else {}

  var hDendrogramChecked = getValue("hDendrogram.checked");
  var useSubsetChecked = getValue("useSubset.checked");
  var varsSelectedShortname = getValue("varsSelected.shortname").split("\n").join("\", \"");
  var frmDtprprtnEnabled = getValue("frm_Dtprprtn.enabled");
  if(hDendrogramChecked) {
    echo("\n");  
        // in case there are generic plot options defined:
    var embRkwrdpltptnGCodePreprocess = getValue("emb_rkwrdpltptnG.code.preprocess");
    var embRkwrdpltptnGCodePrintout = getValue("emb_rkwrdpltptnG.code.printout");
    var embRkwrdpltptnGCodeCalculate = getValue("emb_rkwrdpltptnG.code.calculate");

    if(full) {
      echo("rk.graph.on()\n");
    } else {}
    echo("    try({\n");

    // insert any option-setting code that should be run before the actual plotting commands:
    printIndentedUnlessEmpty("      ", embRkwrdpltptnGCodePreprocess, "\n", "");

    // the actual plot:
    if(!embRkwrdpltptnGCodePrintout.match(/sub\s*=/) && !frmDtprprtnEnabled) {
      echo("\t\t# extract distance computation method from dist object\n\t\tdistance.computation <- attr(" + dataSelected + ", \"method\")\n");  
    } else {}
    if(hMinHeight != 0) {
      echo("\t\t# set minimum height\n\t\tclust.h.result$height <- pmax(clust.h.result$height, " + hMinHeight + ")\n");  
    } else {}
    if(hUnit) {
      echo("\t\t# set equally spaced heights\n\t\tclust.h.result$height <- rank(clust.h.result$height)\n");  
    } else {}
    echo("\t\tplot(clust.h.result");
    if(!embRkwrdpltptnGCodePrintout.match(/main\s*=/)) {
      echo(",\n\t\t\tmain=\"Cluster dendrogram\"");  
    } else {}
    if(!embRkwrdpltptnGCodePrintout.match(/sub\s*=/)) {
      if(frmDtprprtnEnabled) {
        echo(",\n\t\t\tsub=\"Distance computation: " + distMethod + ", agglomeration method: " + clustMethod + "\"");  
      } else {
        echo(",\n\t\t\tsub=paste(\"Distance computation: \", distance.computation, \", agglomeration method: " + clustMethod + "\", sep=\"\")");  
      }  
    } else {}
    if(!embRkwrdpltptnGCodePrintout.match(/xlab\s*=/)) {
      echo(",\n\t\t\txlab=\"Data: " + dataSelected + "\"");  
    } else {}
    if(hHang != 0.1) {
      echo(",\n\t\t\thang=" + hHang);  
    } else {}
    echo(embRkwrdpltptnGCodePrintout.replace(/, /g, ",\n\t\t\t"));
    echo(")");
    if(clusterBorder > 1) {
      echo("\n\t\trect.hclust(clust.h.result, k=" + clusterBorder + ", border=\"red\")");  
    } else {}

    // insert any option-setting code that should be run after the actual plot:
    printIndentedUnlessEmpty("      ", embRkwrdpltptnGCodeCalculate, "\n", "");

    echo("\n    })\n");
    if(full) {
      echo("rk.graph.off()\n");
    } else {}  
  } else {}
  if(full) {
    echo("\nrk.print(clust.h.result)\n");  
    if(useSubsetChecked && varsSelectedShortname != "") {
      echo("\n");  
      new Header(i18n("Subset of variables included the analysis"), 3).print();  
      echo("rk.print(list(\"" + varsSelectedShortname + "\"))\n\n");  
    } else {}  
  } else {}

  // left over from the printout function

  //// save result object
  // read in saveobject variables
  var hSaveResults = getValue("hSaveResults");
  var hSaveResultsActive = getValue("hSaveResults.active");
  var hSaveResultsParent = getValue("hSaveResults.parent");
  // assign object to chosen environment
  if(hSaveResultsActive) {
    echo(".GlobalEnv$" + hSaveResults + " <- clust.h.result\n");
  } else {}


}