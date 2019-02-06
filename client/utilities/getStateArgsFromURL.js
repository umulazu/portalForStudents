const getStateArgsFromURL = (url) => {
    const splitedURL = url.split('?');

    const path = splitedURL[0];
    const splitedPath = path.split('/');
    const tableType = splitedPath[1];
    let candidateStatus = '';
    switch (tableType) {
        case 'interviewees':
            candidateStatus = 'Interviewee';
            break
        case 'students':
            candidateStatus = 'Student';
            break
        case 'trainees':
            candidateStatus = 'Trainee';
            break
    }

    const URLargs = splitedURL[1]
    const args = {};
    if (URLargs) {
        const argsArray = URLargs.split('&');
        argsArray.forEach((arg) => {
            const splitedArg = arg.split('=');
            args[splitedArg[0]] = splitedArg[1]
        })
    }

    let result = {};
    if (args.skip) {
        result.offset = Number(args.skip)
    }

    return result
}

export default getStateArgsFromURL