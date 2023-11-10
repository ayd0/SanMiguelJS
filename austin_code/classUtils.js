const hOverrides = (state, override) =>
    state + (override !== undefined ? override : 0);

export default { hOverrides };
