import { Box, Text, measureElement } from 'ink';
import React from 'react';
import { elements } from './util/misc.js';

export default function RPane({ pointer, consoleHeight }) {
    const [files, setFiles] = React.useState([]);
    const ref = React.useRef();
    const [dmsn, setDmsn] = React.useState({ width: 0, height: 0 });
    const [p, setP] = React.useState(0);
    React.useEffect(() => {
        const { width, height } = measureElement(ref.current);
        setDmsn({ width: width, height: height });
    }, []);
    React.useLayoutEffect(() => {
        setFiles(['hello']);
    }, []);
    return (
        <Box flexDirection="column" width="30%" ref={ref}>
            {elements(files, consoleHeight, dmsn)}
        </Box>
    );
}
