// this code was generated using the rkwarddev package.
//perhaps don't make changes here, but in the rkwarddev script instead!



function preprocess(){
  // add requirements etc. here

}

function calculate(){
  // read in variables from dialog
  var dataSelected = getString("dataSelected");
  var varsSelected = getString("varsSelected");
  var nMaxClust = getString("nMaxClust");
  var nClustMethod = getString("nClustMethod");
  var distMethod = getString("distMethod");
  var powerMinkowski = getString("powerMinkowski");
  var clustMethod = getString("clustMethod");
  var omitNA = getBoolean("omitNA.state");
  var scaleValues = getBoolean("scaleValues.state");
  var useSubsetChecked = getBoolean("useSubset.checked");

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
  if(nClustMethod == "kmeans" && dataSelected) {
    echo("\t# Calculate within groups sum of squares" + "\n\tclust.wss <- (nrow(" + dataSelected + ")-1) * sum(apply(" + dataSelected + ", 2, var))\n" + "\tfor (i in 2:" + nMaxClust + "){\n\t\tclust.wss[i] <- kmeans(" + dataSelected + ", centers=i)$tot.withinss\n\t}\n\n");  
  } else {}
  if(nClustMethod == "hclust" && dataSelected) {
    echo("\t# Get clustering criterion");  
    if(frmDtprprtnEnabled) {
      echo("\n\tclust.from <- nrow(" + dataSelected + ")-" + nMaxClust + "\n\tclust.to <- nrow(" + dataSelected + ")-1" + "\n\tclust.wss <- hclust(dist(" + dataSelected + ", method=\"" + distMethod + "\"), method=\"" + clustMethod + "\")$height[clust.from:clust.to]\n\n");  
    } else {
      echo("\n\tclust.from <- attr(" + dataSelected + ", \"Size\")-" + nMaxClust + "\n\tclust.to <- attr(" + dataSelected + ", \"Size\")-1" + "\n\tclust.wss <- hclust(" + dataSelected + ", method=\"" + clustMethod + "\")$height[clust.from:clust.to]\n\n");  
    }  
  } else {}
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
  var nMaxClust = getString("nMaxClust");
  var nClustMethod = getString("nClustMethod");
  var distMethod = getString("distMethod");
  var powerMinkowski = getString("powerMinkowski");
  var clustMethod = getString("clustMethod");
  var omitNA = getBoolean("omitNA.state");
  var scaleValues = getBoolean("scaleValues.state");
  var useSubsetChecked = getBoolean("useSubset.checked");

  // create the plot
  if(full) {
    new Header(i18n("Determine number of clusters results")).print();
  } else {}

  var useSubsetChecked = getValue("useSubset.checked");
  var varsSelectedShortname = getValue("varsSelected.shortname").split("\n").join("\", \"");
  var frmDtprprtnEnabled = getValue("frm_Dtprprtn.enabled");
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
      echo("\t# extract distance computation method from dist object\n\tdistance.computation <- attr(" + dataSelected + ", \"method\")\n\n");  
    } else {}
    echo("\t\tplot(\n\t\t\t");
    if(nClustMethod == "kmeans" && frmDtprprtnEnabled) {
      echo("1:" + nMaxClust + ",\n\t\t\tclust.wss");  
      if(!embRkwrdpltptnGCodePrintout.match(/type\s*=/)) {
        echo(",\n\t\t\ttype=\"b\"");  
      } else {}  
      if(!embRkwrdpltptnGCodePrintout.match(/xlab\s*=/)) {
        echo(",\n\t\t\txlab=\"Number of Clusters\"");  
      } else {}  
      if(!embRkwrdpltptnGCodePrintout.match(/ylab\s*=/)) {
        echo(",\n\t\t\tylab=\"Within groups sum of squares\"");  
      } else {}  
      if(!embRkwrdpltptnGCodePrintout.match(/main\s*=/)) {
        echo(",\n\t\t\tmain=\"Within sum of squares by clusters\"");  
      } else {}  
      if(!embRkwrdpltptnGCodePrintout.match(/sub\s*=/)) {
        echo(",\n\t\t\tsub=\"Examined " + nMaxClust + " clusters using k-means partitioning\"");  
      } else {}  
      echo(embRkwrdpltptnGCodePrintout.replace(/, /g, ",\n\t\t\t"));  
      echo(")");  
    } else {}
    if(nClustMethod == "hclust" || !frmDtprprtnEnabled) {
      echo("clust.wss");  
      if(!embRkwrdpltptnGCodePrintout.match(/type\s*=/)) {
        echo(",\n\t\t\ttype=\"b\"");  
      } else {}  
      if(!embRkwrdpltptnGCodePrintout.match(/xlab\s*=/)) {
        echo(",\n\t\t\txlab=\"Number of Clusters\"");  
      } else {}  
      if(!embRkwrdpltptnGCodePrintout.match(/ylab\s*=/)) {
        echo(",\n\t\t\tylab=\"Agglomeration criterion\"");  
      } else {}  
      if(!embRkwrdpltptnGCodePrintout.match(/main\s*=/)) {
        echo(",\n\t\t\tmain=\"Inverse Scree plot\"");  
      } else {}  
      if(!embRkwrdpltptnGCodePrintout.match(/sub\s*=/)) {
        if(frmDtprprtnEnabled) {
          echo(",\n\t\t\tsub=\"Examined " + nMaxClust + " clusters (dist: " + distMethod + ", hclust: " + clustMethod + ")\"");  
        } else {
          echo(",\n\t\t\tsub=paste(\"Examined " + nMaxClust + " clusters (dist: \", distance.computation, \", hclust: " + clustMethod + ")\", sep=\"\")");  
        }  
      } else {}  
      echo(",\n\t\t\txaxt=\"n\"");  
      echo(embRkwrdpltptnGCodePrintout.replace(/, /g, ",\n\t\t\t"));  
      echo(")" + "\n\t\taxis(1, at=1:" + nMaxClust + ", labels=" + nMaxClust + ":1)");  
    } else {}

    // insert any option-setting code that should be run after the actual plot:
    printIndentedUnlessEmpty("      ", embRkwrdpltptnGCodeCalculate, "\n", "");

    echo("\n    })\n");
    if(full) {
      echo("rk.graph.off()\n");
    } else {}
  if(!full) {
    if(useSubsetChecked && varsSelectedShortname != "") {
      echo("\n");  
      new Header(i18n("Subset of variables included the analysis"), 3).print();  
      echo("rk.print(list(\"" + varsSelectedShortname + "\"))\n\n");  
    } else {}  
  } else {}
}