#!/bin/bash 
for d in *; do
    echo $d
    `ng-annotate -a $d -o $d`
done
