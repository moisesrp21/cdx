import { Box, measureElement, Text } from 'ink';
import React from 'react';
import { display, manageInput } from './util/misc.js';

export default function CPane({
    file,
    queue,
    top,
    bottom,
    updateQueue,
    setFile,
    filesLen,
}) {
    const ref = React.useRef();
    const p = React.useRef({ v: 0 });
    const [dmsn, setDmsn] = React.useState({ width: 0, height: 0 });
    React.useLayoutEffect(() => {
        const { width, height } = measureElement(ref.current);
        setDmsn({ width: width, height: height });
    }, []);
    const check = () => {
        if (p.current.v < top.current.v) {
            top.current.v--;
            bottom.current.v.v--;
            updateQueue();
        }
        if (p.current.v >= bottom.current.v) {
            top.current.v++;
            bottom.current.v++;
            updateQueue();
        }
    };
    manageInput(p, file, queue, setFile, filesLen, check);
    return (
        <Box flexDirection="row" width="30%" ref={ref}>
            <Box flexDirection="column" flexGrow={1} alignItems="flex-start">
                {display(queue, file, dmsn)}
            </Box>
        </Box>
    );
}
