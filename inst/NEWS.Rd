\name{NEWS}
\title{News for Package 'rk.ClusterAnalysis'}
\encoding{UTF-8}
\section{Changes in rk.ClusterAnalysis version 0.01-15 (2022-05-03)}{
  \subsection{fixed}{
    \itemize{
      \item screenshot URL and removed flattr-link in README.md
      \item replaced deprecated \code{doPrintout()} with \code{printout()} in JavaScript
    }
  }
}
\section{Changes in rk.ClusterAnalysis version 0.01-14 (2015-11-19)}{
  \subsection{fixed}{
    \itemize{
      \item JavaScript header for k-means clustering was quoted too often
      \item missing ChangeLog
    }
  }
  \subsection{changed}{
    \itemize{
      \item updated the generator script
      \item rebuilt with rkwarddev 0.08-1
      \item initial release
    }
  }
  \subsection{added}{
    \itemize{
      \item plugin is now translatable (see inst/rkward/po/)
      \item german translation
    }
  }
}
\section{Changes in rk.ClusterAnalysis version 0.01-13 (2015-06-17)}{
  \subsection{fixed}{
    \itemize{
      \item fixed bugs in the checkbox evaluation, didn't work in recent RKWard
        versions any longer
      \item replacing \code{"ward"} with \code{"ward.D"} (as of R 3.0.3)
    }
  }
  \subsection{changed}{
    \itemize{
      \item replaced the deprecated \code{plclust()} with \code{plot()}, including workarounds for
        the options \code{"unit"} and \code{"hmin"} which are no longer available with \code{plot()}
    }
  }
  \subsection{added}{
    \itemize{
      \item new clustering method \code{"ward.D2"} (as of R 3.0.3)
    }
  }
}
\section{Changes in rk.ClusterAnalysis version 0.01-12 (2015-03-14)}{
  \subsection{fixed}{
    \itemize{
      \item replaced the outdated links to sourceforge with our new KDE URL
    }
  }
}
\section{Changes in rk.ClusterAnalysis version 0.01-11 (2015-03-13)}{
  \subsection{changed}{
    \itemize{
      \item rebuilt using rkwarddev 0.07-1
    }
  }
}
\section{Changes in rk.ClusterAnalysis version 0.01-10 (2013-04-14)}{
  \subsection{fixed}{
    \itemize{
      \item corrected logic sections in hierarchical CA and determine number of
        clusters dialogs (distance calculation was not correctly enabled/disabled)
    }
  }
}
\section{Changes in rk.ClusterAnalysis version 0.01-9 (2013-04-04)}{
  \subsection{added}{
    \itemize{
      \item debianized the plugin
    }
  }
  \subsection{fixed}{
    \itemize{
      \item removed erroneous pluginmap inclusions from XML files
    }
  }
}
\section{Changes in rk.ClusterAnalysis version 0.01-8 (2013-02-24)}{
  \subsection{changed}{
    \itemize{
      \item updated rkwarddev generator script (compatibility with 0.06-2) and
        regenerated plugin code
    }
  }
}
\section{Changes in rk.ClusterAnalysis version 0.01-7 (2012-09-29)}{
  \subsection{fixed}{
    \itemize{
      \item added generic pre/post plot options
    }
  }
}
\section{Changes in rk.ClusterAnalysis version 0.01-6 (2012-04-06)}{
  \subsection{changes}{
    \itemize{
      \item added a ChangeLog file
      \item rebuild package for R 2.15
    }
  }
}
