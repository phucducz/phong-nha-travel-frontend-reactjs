import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faChevronDown } from "@fortawesome/free-solid-svg-icons";

import styles from "./TaskListStyle.module.scss";

const cx = classNames.bind(styles);

function TaskList({ title, tasks, action }) {
    const [count, setCount] = useState(+0);

    const [activeTask, setActiveTask] = useState();
    const tagTasks = useRef();

    const { setTable } = action;

    const handleOnClickTask = (index, task) => {
        setActiveTask(index);
        setTable(task);
    }

    useEffect(() => {
        if (count % 2 != 0)
            tagTasks.current.setAttribute('style', 'height: calc(4rem * 3)');
        else
            tagTasks.current.setAttribute('style', 'height: 0');
    }, [count]);

    return (
        <div className={cx('tasks')}>
            <div
                onClick={() => setCount(prev => prev + 1)}
                className={cx('tasks_title')}
            >
                <FontAwesomeIcon className={cx('icon-list')} icon={faList} />
                <span>{title}</span>
                <FontAwesomeIcon className={cx('icon-task')} icon={faChevronDown} />
            </div>
            <div
                ref={tagTasks}
                className={cx(`_tasks`)}
            >
                {tasks.map((task, index) => {
                    return (
                        <p
                            key={index}
                            onClick={() => handleOnClickTask(index, task)}
                            className={cx('tasks_list')}
                        >
                            {task}
                        </p>
                    )
                })}
            </div>
        </div>
    )
}

export default TaskList;