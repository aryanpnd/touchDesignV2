export const modules = [
    {
        id: 'assignments',
        title: 'Assignments',
        icon: require('@/assets/icons/assignments.png'), // Replace with actual assignment icon
        value: '10 pending',
        onPress: () => console.log('Assignments pressed'),
    },
    {
        id: 'cgpa',
        title: 'CGPA',
        icon: require('@/assets/icons/cgpa.png'), // Replace with actual CGPA icon
        value: '7.5',
        onPress: () => console.log('CGPA pressed'),
    },
    {
        id: 'drives',
        title: 'Drives',
        icon: require('@/assets/icons/drives.png'), // Replace with actual drives icon
        value: '3 active',
        onPress: () => console.log('Drives pressed'),
    },
    {
        id: 'exams',
        title: 'Exams',
        icon: require('@/assets/icons/exams.png'), // Replace with actual exams icon
        value: '2 upcoming',
        onPress: () => console.log('Exams pressed'),
    },
    {
        id: 'marks',
        title: 'Marks',
        icon: require('@/assets/icons/marks.png'), // Replace with actual marks icon
        value: 'View all',
        onPress: () => console.log('Marks pressed'),
    },
    {
        id: 'rms',
        title: 'RMS',
        icon: require('@/assets/icons/rms.png'), // Replace with actual RMS icon
        // value: 'Access',
        onPress: () => console.log('RMS pressed'),
    },
];