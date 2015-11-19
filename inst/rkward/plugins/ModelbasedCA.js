// this code was generated using the rkwarddev package.
// perhaps don't make changes here, but in the rkwarddev script instead!
// 
// look for a file called: $SRC/inst/rkward/rkwarddev_CA_plugin_script.R



function preprocess(){
  // add requirements etc. here
  echo("require(mclust)\n");
}

function calculate(){
  // read in variables from dialog
  var dataSelected = getString("dataSelected");
  var varsSelected = getString("varsSelected");
  var mSaveResults = getString("mSaveResults");
  var mNumClust = getString("mNumClust");
  var mPlotType = getString("mPlotType");
  var omitNA = getBoolean("omitNA.state");
  var scaleValues = getBoolean("scaleValues.state");
  var useSubsetChecked = getBoolean("useSubset.checked");
  var frmPltrsltsChecked = getBoolean("frm_Pltrslts.checked");

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
  comment("Model based CA", "  ");
  echo("\tclust.m.result <- Mclust(data=" + dataSelected);
  if(mNumClust != 9) {
    echo(",\n\t\tG=1:" + mNumClust + "\n\t");  
  } else {}
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
  var dataSelected = getString("dataSelected");
  var varsSelected = getString("varsSelected");
  var mSaveResults = getString("mSaveResults");
  var mNumClust = getString("mNumClust");
  var mPlotType = getString("mPlotType");
  var omitNA = getBoolean("omitNA.state");
  var scaleValues = getBoolean("scaleValues.state");
  var useSubsetChecked = getBoolean("useSubset.checked");
  var frmPltrsltsChecked = getBoolean("frm_Pltrslts.checked");

  // create the plot
  if(full) {
    new Header(i18n("Model based CA results")).print();
  } else {}

  var frmPltrsltsChecked = getValue("frm_Pltrslts.checked");
  var useSubsetChecked = getValue("useSubset.checked");
  var varsSelectedShortname = getValue("varsSelected.shortname").split("\n").join("\", \"");
  if(frmPltrsltsChecked) {
    echo("\n");  
        

    if(full) {
      echo("rk.graph.on()\n");
    } else {}
    echo("    try({\n");

    

    // the actual plot:
    echo("\t\tplot(clust.m.result,\n\t\t\tdata=" + dataSelected + ",\n\t\t\twhat=\"" + mPlotType + "\"");
    echo(")");

    

    echo("\n    })\n");
    if(full) {
      echo("rk.graph.off()\n");
    } else {}  
  } else {}
  if(full) {
    echo("\nrk.print(clust.m.result)\n");  
    if(useSubsetChecked && varsSelectedShortname != "") {
      echo("\n");  
      new Header(i18n("Subset of variables included the analysis"), 3).print();  
      echo("rk.print(list(\"" + varsSelectedShortname + "\"))\n\n");  
    } else {}  
  } else {}

  // left over from the printout function

  //// save result object
  // read in saveobject variables
  var mSaveResults = getValue("mSaveResults");
  var mSaveResultsActive = getValue("mSaveResults.active");
  var mSaveResultsParent = getValue("mSaveResults.parent");
  // assign object to chosen environment
  if(mSaveResultsActive) {
    echo(".GlobalEnv$" + mSaveResults + " <- clust.m.result\n");
  } else {}


}