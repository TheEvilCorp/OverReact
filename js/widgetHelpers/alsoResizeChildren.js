export default function(node) {
  node.find('div.box').each( function() {
    let children = [];
    const $self = $(this);
    $self.find('div.box').each(function() {
      children.push(`#${$self.attr('id')}`);
    });
    children = children.join(',');
    $self.resizable({
      alsoResize: children
    });
  });
};
