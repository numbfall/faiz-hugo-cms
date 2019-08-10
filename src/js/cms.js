import React from "react";
import CMS from "netlify-cms";

import HomePreview from "./cms-preview-templates/home";
import PostPreview from "./cms-preview-templates/post";
import ProjectsPreview from "./cms-preview-templates/projects";
import ValuesPreview from "./cms-preview-templates/values";
import ContactPreview from "./cms-preview-templates/contact";
import DonatePreview from "./cms-preview-templates/donate";


// Example of creating a custom color widget
class ColorControl extends React.Component {
  render() {
    return <input
      style={{height: "80px"}}
      type="color"
      value={this.props.value}
      onInput={(e) => this.props.onChange(e.target.value)}
    />;
  }
}

CMS.registerPreviewStyle("/css/main.css");
CMS.registerPreviewTemplate("home", HomePreview);
CMS.registerPreviewTemplate("post", PostPreview);
CMS.registerPreviewTemplate("projects", ProjectsPreview);
CMS.registerPreviewTemplate("values", ValuesPreview);
CMS.registerPreviewTemplate("contact", ContactPreview);
CMS.registerPreviewTemplate("donate", DonatePreview);
CMS.registerWidget("color", ColorControl);
