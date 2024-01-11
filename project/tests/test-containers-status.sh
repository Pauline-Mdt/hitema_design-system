#!/bin/bash

# Exécute la commande docker ps avec un format personnalisé
docker ps --format "table {{.Names}}\t{{.Status}}"
