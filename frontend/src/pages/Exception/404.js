import React from 'react';
import Link from 'umi/link';
import Exception from '@/components/Exception';

const Exception404 = () => (
    <Exception
        type="404"
        desc="Sorry, the page you visited does not exist."
        linkElement={Link}
        backText="Back to home"
    />
);

export default Exception404;
