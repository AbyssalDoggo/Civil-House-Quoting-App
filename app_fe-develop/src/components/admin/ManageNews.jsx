import NewsCard from "../../auth/homes/components/NewsCard";
import { useEffect, useState } from "react";
import axios from "axios";
import AddNewsDialog from "../../auth/homes/components/AddNewsDialog";
import authService from "../../auth/services/auth.service";
import { Typography } from "antd";

const { Title } = Typography;

const ManageNews = () => {
    const [newsList, setNewsList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);

    useEffect(() => {
        async function fetchNews() {
            const data = await axios.post("http://localhost:8080/api/news/get");
            setNewsList([...data?.data]);
        }
        fetchNews();
    }, []);

    function showAddNewsDialog() {
        setShowModal(!showModal);
    }

    useEffect(() => {
        const user = authService.getCurrentUser();

        if (user) {
            const roles = user.role || [];
            setShowModeratorBoard(roles.includes("MOD"));
            setShowAdminBoard(roles.includes("ADMIN"));
        }
    }, []);

    return (
        <div className="newslist">
            <Title level={4} style={{ fontWeight: "bold" }}>
                QUẢN LÝ TIN TỨC
            </Title>
            {(showModeratorBoard || showAdminBoard) && (
                <div className="newslistbreadcrumb">
                    <div className="newslisttitle">{/* <h3>Các dự án đã triển khai</h3> */}</div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div style={{ marginRight: "4px" }}>
                            {(showModeratorBoard || showAdminBoard) && (
                                <button onClick={showAddNewsDialog}>Thêm tin tức</button>
                            )}
                        </div>
                    </div>
                </div>
            )}
            <div>
                {newsList?.map((newsItem, i) => (
                    <NewsCard newsItem={newsItem} key={i} />
                ))}
            </div>
            {showModal ? <AddNewsDialog closeModal={showAddNewsDialog} /> : null}
        </div>
    );
};

export default ManageNews;
