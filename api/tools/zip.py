#!/usr/bin/env python
import sys
import os
import shutil
import tempfile
import uuid

if __name__ == '__main__':
    srcDir = os.path.abspath(sys.argv[1])
    outputFile = os.path.abspath(sys.argv[2])

    tempDir = os.path.join(tempfile.gettempdir(), 'zippy-builds')
    tempFile = os.path.join(tempDir, str(uuid.uuid4()))

    print('creating deployable zip from ' + srcDir + '...')

    try:
        if os.path.exists(outputFile):
            print('output file exists.  deleting \'' + outputFile + '\'')
            os.remove(outputFile)
        
        os.makedirs(os.path.dirname(outputFile))

        print ('creating zip in \'' + tempDir + '\'...')
        shutil.make_archive(tempFile, 'zip', srcDir)

        print('copying \'' + tempFile + '.zip\' to \'' + outputFile + '\'...')
        shutil.move(tempFile + '.zip', outputFile)

        print('zip succeeded.')
    except:
        e = sys.exc_info()[0]
        print(e)
        print('cleaning up...')

        shutil.rmtree(tempDir)

        print('zip failed.')