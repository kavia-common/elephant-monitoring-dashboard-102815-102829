#!/bin/bash
cd /home/kavia/workspace/code-generation/elephant-monitoring-dashboard-102815-102829/elephant_dashboard_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

