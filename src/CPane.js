import { Box, measureElement } from 'ink';
import React from 'react';
import { display, getFiles, manageInput } from './util/misc.js';

export default function CPane({ dir, consoleHeight }) {
    const ref = React.useRef();
    const top = React.useRef(0);
    const bottom = React.useRef(0);
    const p = React.useRef(0);
    const [file, setFile] = React.useState(0);
    const [dmsn, setDmsn] = React.useState({ width: 0, height: 0 });
    const [files, setFiles] = React.useState([]);
    const [queue, setQueue] = React.useState([]);
    const check = () => {
        if (p.current < top.current) {
            top.current--;
            bottom.current--;
            update();
        }
        if (p.current >= bottom.current) {
            top.current++;
            bottom.current++;
            update();
        }
    };
    const update = () => {
        let tmp = [];
        for (let i = top.current; i < bottom.current; i++) {
            tmp.push(files[i]);
        }
        setQueue(tmp);
    };
    manageInput(
        p,
        file,
        setFile,
        Math.min(queue.length, files.length),
        files.length,
        check,
    );
    React.useLayoutEffect(() => {
        getFiles(dir, setFiles, setQueue, consoleHeight, top, bottom);
        const { width, height } = measureElement(ref.current);
        setDmsn({ width: width, height: height });
    }, []);
    return (
        <Box flexDirection="row" width="40%" ref={ref}>
            {/* <Box flexDirection="column" flexGrow={1} alignItems="flex-start">
                <Text>{files.length}</Text>
                <Text>{queue.length}</Text>
            </Box> */}
            <Box flexDirection="column" flexGrow={1} alignItems="flex-start">
                {display(queue, file, dmsn)}
            </Box>
        </Box>
    );
}
