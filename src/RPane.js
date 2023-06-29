import { Box, Text, measureElement, useStdout } from 'ink';
import React from 'react';
import { display, getFiles } from './util/misc.js';

export default function RPane({ dir, file }) {
    const ref = React.useRef();
    const [dmsn, setDmsn] = React.useState({ width: 0, height: 0 });
    const [files, setFiles] = React.useState([]);
    React.useLayoutEffect(() => {
        if (file.type == 'directory') {
            getFiles(`${dir}/${file.name}`).then((files) => {
                let size = Math.min(process.stdout.rows / 3, files.length);
                setFiles(files.slice(0, size));
            });
        }
    }, [file]);
    React.useEffect(() => {
        const { width, height } = measureElement(ref.current);
        setDmsn({ width: width, height: height });
    }, []);
    return (
        <Box flexDirection="column" width="40%" ref={ref}>
            {file.type == 'directory' ? (
                display(files, 0, dmsn)
            ) : (
                <Text> empty</Text>
            )}
        </Box>
    );
}
