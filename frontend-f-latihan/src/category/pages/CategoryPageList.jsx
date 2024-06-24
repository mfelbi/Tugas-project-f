import { useContext, useEffect } from "react";
import { UtilStateContextBase } from "../../utils/states/contexts";
import { useNavigate } from "react-router-dom";
import useList from "../../utils/hooks/useList";
import {
  Button,
  Card,
  Col,
  Container,
  Row,
  Table,
  NavLink,
} from "react-bootstrap";
import ManagerWidgetTitle from "../../managers/widgets/ManagerWidgetTitle";
import ManagerWidgetFilter from "../../managers/widgets/ManagerWidgetFilter";
import ManagerWidgetRBAC from "../../managers/widgets/ManagerWidgetRBAC";
import {
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
} from "../states/constants";

const CategoryPageList = () => {
  const navigate = useNavigate();
  const context = useContext(UtilStateContextBase);
  const categoryList = useList(["category"]);

  useEffect(() => {
    categoryList.onAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <ManagerWidgetTitle title={"Category"}>
        <ManagerWidgetRBAC context={context} permissions={[CREATE_CATEGORY]}>
          <Button onClick={() => navigate("create")}>New Category</Button>
        </ManagerWidgetRBAC>
      </ManagerWidgetTitle>

      <Row className="mb-3">
        <Col>
          <Card>
            <Card.Body>
              <ManagerWidgetFilter
                fields={[{ value: "name", text: "Name" }]}
                callback={(value) => {
                  categoryList.filter.current.field = value.field;
                  categoryList.filter.current.value = value.value;
                  categoryList.filter.current.page = 1;
                  categoryList.onAll();
                }}
              />
            </Card.Body>
            <Table striped borderless responsive hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categoryList.states.map((category) => (
                  <tr key={category._id}>
                    <td>{category.name}</td>
                    <td>{category.description}</td>
                    <td>
                      <div className={"d-flex justify-content-start gap-3"}>
                        <ManagerWidgetRBAC
                          context={context}
                          permissions={[UPDATE_CATEGORY]}
                        >
                          <NavLink
                            className={"text-secondary"}
                            href={`#/category/update/${category._id}`}
                          >
                            edit
                          </NavLink>
                        </ManagerWidgetRBAC>
                        <ManagerWidgetRBAC
                          context={context}
                          permissions={[DELETE_CATEGORY]}
                        >
                          <NavLink
                            className={"text-secondary"}
                            href={`#/category/delete/${category._id}`}
                          >
                            delete
                          </NavLink>
                        </ManagerWidgetRBAC>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CategoryPageList;
