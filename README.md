# Testing file-upload

We've discovered an issue where customers on Android+Chrome cannot upload part files. This repository contains
simplified testcase javascript to reproduce and isolate the problem and try solutions.

The problem appears to be when uploading files from Google Drive, as opposed to stored locally on the device.
