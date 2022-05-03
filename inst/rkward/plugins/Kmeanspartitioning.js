// this code was generated using the rkwarddev package.
// perhaps don't make changes here, but in the rkwarddev script instead!
// 
// look for a file called: $SRC/inst/rkward/rkwarddev_CA_plugin_script.R

function preview(){
  preprocess(true);
  calculate(true);
  printout(true);
}

function preprocess(is_preview){
  // add requirements etc. here

}

function calculate(is_preview){
  // read in variables from dialog
  var dataSelected = getString("dataSelected");
  var varsSelected = getString("varsSelected");
  var numClust = getString("numClust");
  var kMethod = getString("kMethod");
  var kMaxIter = getString("kMaxIter");
  var numStart = getString("numStart");
  var omitNA = getBoolean("omitNA.state");
  var scaleValues = getBoolean("scaleValues.state");
  var plotClustCenters = getBoolean("plotClustCenters.state");
  var useSubsetChecked = getBoolean("useSubset.checked");
  var kPlotResultsChecked = getBoolean("kPlotResults.checked");

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
  echo("\tclust.k.result <- kmeans(");
  if(dataSelected) {
    echo("\n\t\tx=" + dataSelected);  
  } else {}
  echo(",\n\t\tcenters=" + numClust);
  if(kMethod != "Hartigan-Wong") {
    echo(",\n\t\talgorithm=\"" + kMethod + "\"");  
  } else {}
  if(kMaxIter != 10) {
    echo(",\n\t\titer.max=" + kMaxIter);  
  } else {}
  if(numStart != 1) {
    echo(",\n\t\tnstart=" + numStart);  
  } else {}
  echo("\n\t)\n\n");
}

function printout(is_preview){
  // read in variables from dialog
  var dataSelected = getString("dataSelected");
  var varsSelected = getString("varsSelected");
  var numClust = getString("numClust");
  var kMethod = getString("kMethod");
  var kMaxIter = getString("kMaxIter");
  var numStart = getString("numStart");
  var omitNA = getBoolean("omitNA.state");
  var scaleValues = getBoolean("scaleValues.state");
  var plotClustCenters = getBoolean("plotClustCenters.state");
  var useSubsetChecked = getBoolean("useSubset.checked");
  var kPlotResultsChecked = getBoolean("kPlotResults.checked");

  // printout the results
  if(!is_preview) {
    new Header(i18n("Cluster analysis")).print();  
  } else {}  var kPlotResultsChecked = getValue("kPlotResults.checked");
  var useSubsetChecked = getValue("useSubset.checked");
  var varsSelectedShortname = getValue("varsSelected.shortname").split("\n").join("\", \"");
  if(kPlotResultsChecked) {
    echo("\n");  
        // in case there are generic plot options defined:
    var embRkwrdpltptnGCodePreprocess = getValue("emb_rkwrdpltptnG.code.preprocess");
    var embRkwrdpltptnGCodePrintout = getValue("emb_rkwrdpltptnG.code.printout");
    var embRkwrdpltptnGCodeCalculate = getValue("emb_rkwrdpltptnG.code.calculate");

    if(!is_preview) {
    echo("rk.graph.on()\n");  
  } else {}
    echo("    try({\n");

    // insert any option-setting code that should be run before the actual plotting commands:
    printIndentedUnlessEmpty("      ", embRkwrdpltptnGCodePreprocess, "\n", "");

    // the actual plot:
    echo("\t\tplot(" + dataSelected + ",\n\t\t\tcol=clust.k.result$cluster");
    if(!embRkwrdpltptnGCodePrintout.match(/main\s*=/)) {
      echo(",\n\t\t\tmain=\"K-means partitioning\"");  
    } else {}
    if(!embRkwrdpltptnGCodePrintout.match(/sub\s*=/)) {
      echo(",\n\t\t\tsub=\"Grouped into " + numClust + " clusters by the " + kMethod + " algorithm\"");  
    } else {}
    echo(embRkwrdpltptnGCodePrintout.replace(/, /g, ",\n\t\t\t"));
    echo(")");
    if(plotClustCenters) {
      echo("\n\t\tpoints(clust.k.result$centers, col=1:" + numClust + ", pch=8, cex=2)");  
    } else {}

    // insert any option-setting code that should be run after the actual plot:
    printIndentedUnlessEmpty("      ", embRkwrdpltptnGCodeCalculate, "\n", "");

    echo("\n    })\n");
    if(!is_preview) {
    echo("rk.graph.off()\n");  
  } else {}  
  } else {}
  if(!is_preview) {
    echo("\nrk.print(clust.k.result)\n");  
    if(useSubsetChecked && varsSelectedShortname != "") {
      echo("\n");  
      new Header(i18n("Subset of variables included the analysis"), 3).print();  
      echo("rk.print(list(\"" + varsSelectedShortname + "\"))\n\n");  
    } else {}  
  } else {}
  if(!is_preview) {
    //// save result object
    // read in saveobject variables
    var kSaveResults = getValue("kSaveResults");
    var kSaveResultsActive = getValue("kSaveResults.active");
    var kSaveResultsParent = getValue("kSaveResults.parent");
    // assign object to chosen environment
    if(kSaveResultsActive) {
      echo(".GlobalEnv$" + kSaveResults + " <- clust.k.result\n");
    } else {}  
  } else {}

}

