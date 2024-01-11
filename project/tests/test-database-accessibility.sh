#!/bin/bash

# Test MySQL database accessibility
if mysql -h 0.0.0.0 -P 32789 -u admin_lg_2023 -psecretpwd@user -e "SELECT 1"; then
    echo "Database is accessible."

    # Test if the 'les_gorgones' database exists
    if mysql -h 0.0.0.0 -P 32789 -u admin_lg_2023 -psecretpwd@user -e "USE les_gorgones"; then
        echo "les_gorgones database exists."
    else
        echo "les_gorgones database does not exist."
        exit 1
    fi

    exit 0
else
    echo "Database is not accessible."
    exit 1
fi