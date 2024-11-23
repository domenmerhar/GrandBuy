import styled from "styled-components";
import { Column } from "../../Util/Column";
import { Content } from "../../Util/Content";
import { HeaderUppercaseBold } from "../../Util/HeaderUppercaseBold";
import { InputWithLabel } from "../../Util/InputWithLabel";
import { Row } from "../../Util/Row";
import { Button } from "../../Util/Button";
import { SwitchButtons } from "../../Util/SwitchButtons";
import { Modal } from "../../Util/Modal";

const Image = styled.img`
  height: 12.4rem;
  width: 12.4rem;
  border-radius: 50%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 4px;

  align-items: stretch;
  width: 50rem;

  & > h2,
  & > h3 {
    align-self: flex-start;
    margin-bottom: 1.2rem;
  }

  & > label {
    margin-top: 8px;
  }

  & > label:first-of-type {
    margin-top: 0;
  }

  & > button {
    margin-top: 2.4rem;
  }
`;

export const AccountPage = () => {
  return (
    <Content>
      <Column $alignItems="center" $gap="36px">
        <Image src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIALcAwwMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABAUBAwYCB//EADEQAQACAQIDBwIDCQAAAAAAAAABAgMEESExUQUSIjJBYXEjUhMUwRUzYoGRoaKx0f/EABcBAQEBAQAAAAAAAAAAAAAAAAABAgP/xAAWEQEBAQAAAAAAAAAAAAAAAAAAARH/2gAMAwEAAhEDEQA/APoIDo5gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9232z/QGAAAAAAAAAAAAAAAAAAAAASdHpLam2/lxxzt/wABqw4cme/dx13n/SywdmY67Tmnvz0jhCZixUw0imOu1Ye2dakeaY6Y42x0rX4jZ73YEV4yYseSPqUrb5hEzdmYr7zimaT05wnAKDUaXNp/PXw/dHGGl0s8Y2nkr9X2bW299P4bfZ6T8NSs2KoZtE0tNbRMTHOJFRgAAABmtbXtFaxMzPpEMLzQaeuHBWdvHaN7T+iWrIq/yOp23/Bnb5homJrMxaJiY5xLpEPtPT1yYZyxHjpG+/WDVxTAKyAAA94cVs2WuOnOf7A26PTW1OTblSPNK8pSuOkUpG1Y5Q84MVcGKMdOUevV7ZtakAEUAAAAAA2iecQwyA5oBtgAAdDp7xkwUvXlNXPJGk1l9NO0R3qTzrKWLKvWjXXimkyzPrXux/NG/auPb91ffpwQdVqsmptE34VjlWPRJFtaAGmQABd9n6b8vi3tH1Lc/b2Q+y9N37/jXjw1nw+8rZm1qQARQAAAAAAAAAFVbsrJHky1n5jZFzaXPh43xzt1jjC/F1Mc0LvUaDDm3msdy/WsfoqtRpsunttkrw9LRyldTGkBUAAAAG3TYbZ80Y6+vOekNS80Gm/L4vFH1Lcbe3slqyJFKVx0ilI2rEbQyDLQAAAAAAAAAAAAAAxatb1mt4iazziWQFRrOz7Yt74d7U9Y9YQXSq/XaCL75MEbW9a9fhZUsVQTG07TwkaZAS9Bo51Fu/eNsUf5ewN3Zel70xnyRwjyR191oREREREbRHKBhuAAAAAAAAAAAAAAAAAAAAIur0VNR4qz3MnXr8oE9m6iJ2iKz7xZci6mK7T9mRExbPaLfw15LGIiIiIiIiOUQCKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//Z" />

        <Form>
          <HeaderUppercaseBold as="h2">Account info</HeaderUppercaseBold>
          <Row $gap="8px">
            <Column $gap="4px">
              <InputWithLabel
                id="first-name"
                title="First Name"
                type="text"
                placeholder="John"
              />
            </Column>

            <Column $gap="4px">
              <InputWithLabel
                id="last-name"
                title="Last Name"
                type="text"
                placeholder="Doe"
              />
            </Column>
          </Row>

          <InputWithLabel
            id="billing"
            title="Billing Address"
            type="text"
            placeholder="21st Jump Street"
          />

          <InputWithLabel
            id="city"
            title="City"
            type="text"
            placeholder="New York"
          />

          <InputWithLabel
            id="zip"
            title="Zip or Postal Code"
            type="text"
            placeholder="10001"
          />

          <InputWithLabel
            id="country"
            title="Country"
            type="text"
            placeholder="Nigeria"
          />

          <InputWithLabel
            id="phone"
            title="Phone Number"
            type="text"
            placeholder="+234 123 456 7890"
          />

          <Button $color="orange" $shape="rectangle" $size="medium">
            Save Changes
          </Button>
        </Form>

        <Form>
          <HeaderUppercaseBold as="h2">Password</HeaderUppercaseBold>

          <InputWithLabel
            id="password"
            title="Password"
            type="password"
            placeholder="********"
          />

          <InputWithLabel
            id="confirm-password"
            title="Confirm Password"
            type="password"
            placeholder="********"
          />

          <Button $color="orange" $shape="rectangle" $size="medium">
            Change Password
          </Button>
        </Form>

        <Form>
          <HeaderUppercaseBold as="h2">Role</HeaderUppercaseBold>

          <InputWithLabel
            id="role"
            title="Role"
            type="text"
            placeholder="User"
            disabled={true}
          />

          <Button $color="orange" $shape="rectangle" $size="medium">
            Request Seller
          </Button>
        </Form>

        <Form as="div">
          <HeaderUppercaseBold as="h2">Language</HeaderUppercaseBold>

          <SwitchButtons
            options={[
              { name: "EN", value: "en" },
              { name: "SL", value: "sl" },
            ]}
          />
        </Form>
      </Column>
      <Modal title="Test">
        After the requests approval you won’t be able to post a review on a
        product anymore.
      </Modal>
    </Content>
  );
};
