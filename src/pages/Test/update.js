function Update({
    title,
    onChange,
    onClick
}) {
    return (
        <div>
            <input value={title} onChange={onChange} />
            <button onClick={onClick}>Update</button>
        </div>
    );
}

export default Update;