What is it
----------

Plugin for [exemd](http://www.vittoriozaccaria.net/exemd/) to generate
graphs in markdown files.

Short help
----------

`dot` is a language for "hierarchical" or layered drawings of directed
graphs. It is part of the [graphviz](http://www.graphviz.org/) package.

To invoke this plugin, you can define code blocks such as:

    ```{dot ! }
    digraph {
            a -> b[label="0.2",weight="0.2"];
            a -> c[label="0.4",weight="0.4"];
            c -> b[label="0.6",weight="0.6"];
            c -> e[label="0.6",weight="0.6"];
            e -> e[label="0.1",weight="0.1"];
            e -> b[label="0.7",weight="0.7"];
        }
    ```

That is converted to this picture:

![](https://dl.dropboxusercontent.com/u/5867765/tools/exemd/exemd-dot.png)
