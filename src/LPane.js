import { Box, Text, measureElement } from 'ink';
import React, { useState } from 'react';
import { elements, findFiles } from './util/misc.js';

export default function LPane({ dir, consoleHeight }) {
    const [files, setFiles] = useState([]);
    const ref = React.useRef();
    const [p, setP] = React.useState(0);
    const [dmsn, setDmsn] = React.useState({ width: 0, height: 0 });
    React.useEffect(() => {
        const { width, height } = measureElement(ref.current);
        setDmsn({ width: width, height: height });
    }, []);
    React.useLayoutEffect(() => {
        let name = findFiles(dir, setFiles);
    }, []);
    return (
        <Box flexDirection="column" width="30%" ref={ref}>
            {elements(files, consoleHeight, dmsn)}
        </Box>
    );
}
