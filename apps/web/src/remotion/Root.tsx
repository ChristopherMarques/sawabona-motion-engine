import React from 'react';
import { Composition } from 'remotion';
import { DashboardShowcase } from '../../../../src/components/templates/DashboardShowcase';

export const RemotionRoot: React.FC = () => {
    return (
        <>
            <Composition
                id="DashboardShowcase"
                component={DashboardShowcase}
                durationInFrames={900}
                fps={60}
                width={1920}
                height={1080}
                defaultProps={{
                    dictionary: undefined
                }}
            />
        </>
    );
};
