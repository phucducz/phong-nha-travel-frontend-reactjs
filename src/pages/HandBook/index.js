import { faFacebookF, faLinkedinIn, faPinterest, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faArrowRight, faCalendarDays, faPenToSquare, faTags, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";

import Button from "~/components/Button";
import { image } from "~/images";
import { HAND_BOOK } from "~/constant";

import styles from "./HandBook.module.scss";
const cx = classNames.bind(styles);

function HandBookPage() {
    return (
        <div className={cx("container")}>
            <div className={cx("content")}>
                <div
                    className={cx("content__header")}
                    style={{
                        backgroundImage: `url(${image.phongNhaVietNam})`,
                        backgroundRepeat: "repeat",
                        backgroundPosition: "50% 0"
                    }}
                >
                    <div className={cx("title-primary")}><h2>Cẩm nang</h2></div>
                    <div className={cx("description-primary")}>Tin tức mới nhất Phong Nha Travel</div>
                </div>
                <div className={cx("blog-list")}>
                    {HAND_BOOK.map(item => (
                        <div className={cx("blog-item")}>
                            <div className="blog-item__header">
                                <div className={cx("title")}>{item.title}</div>
                            </div>
                            <div className={cx("blog-item__body")}>
                                <div className={cx("article-info")}>
                                    <div className={cx("published-info")}>
                                        <div className={cx("date-published", "item")}>
                                            <FontAwesomeIcon icon={faCalendarDays} className={cx("calendar")} />
                                            <p>{item.datePublished}</p>
                                        </div>
                                        <div className={cx("user-published", "item")}>
                                            <FontAwesomeIcon icon={faUser} className={cx("user")} />
                                            <p>{item.user}</p>
                                        </div>
                                        <div className={cx("hand-book", "item")}>
                                            <FontAwesomeIcon icon={faPenToSquare} className={cx("pencil")} />
                                            <p>{item.type}</p>
                                        </div>
                                    </div>
                                    <div className={cx("article-hash-tag")}>
                                        <div className={cx("hash-tag", "item")}>
                                            <FontAwesomeIcon icon={faTags} className={cx("tags")} />
                                            <p>{item.articleSection}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx("thumbnail")}>
                                    <img src={item.thumbnail} alt="thumbnail"/>
                                </div>
                                <div className={cx("description")}>
                                    <p>{item.description}</p>
                                </div>
                                <div className={cx("read-more")}>
                                    <Button
                                        primary
                                        rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
                                    >
                                        Xem thêm
                                    </Button>
                                </div>
                            </div>
                            <div className={cx("blog-item__bottom")}>
                                <div className={cx("facebook", "item")}>
                                    <FontAwesomeIcon icon={faFacebookF} />
                                </div>
                                <div className={cx("twitter", "item")}>
                                    <FontAwesomeIcon icon={faTwitter} />
                                </div>
                                <div className={cx("instagram", "item")}>
                                    <FontAwesomeIcon icon={faLinkedinIn} />
                                </div>
                                <div className={cx("pinterest", "item")}>
                                    <FontAwesomeIcon icon={faPinterest} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HandBookPage;